import * as vscode from 'vscode';
import {
  deactivateLicense,
  getLicenseKey,
  saveLicenseKey,
  validateOrActivateLicense
} from './license';

const PRO_FILE_ICON_THEME = 'zenkai-pro-file-icons';
const PRO_PRODUCT_ICON_THEME = 'zenkai-pro-product-icons';
const PRO_COLOR_THEMES = ['Zenkai Stellar Abyss', 'Zenkai Christmas'];
const FREE_FILE_ICON_THEME = 'zenkai-seti';
const FREE_COLOR_THEME = 'Zenkai Dark';
const DEFAULT_PRODUCT_ICON_THEME = 'Default';

let licenseActive = false;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const activateCommand = vscode.commands.registerCommand('zenkaiPro.activateLicense', async () => {
    const key = await vscode.window.showInputBox({
      title: 'Activate Zenkai Pro',
      prompt: 'Enter your Dodo Payments license key',
      placeHolder: 'XXXX-XXXX-XXXX-XXXX',
      value: getLicenseKey(),
      ignoreFocusOut: true,
      password: true
    });

    if (key === undefined) {
      return;
    }

    await saveLicenseKey(key);
    await refreshLicense(context, true);
  });

  const checkCommand = vscode.commands.registerCommand('zenkaiPro.checkLicense', async () => {
    await refreshLicense(context, true);
  });

  const deactivateCommand = vscode.commands.registerCommand('zenkaiPro.deactivateLicense', async () => {
    const key = getLicenseKey();
    await deactivateLicense(context, key);
    await saveLicenseKey('');
    licenseActive = false;
    await enforceProThemeAccess();
    vscode.window.showInformationMessage('Zenkai Pro license deactivated.');
  });

  context.subscriptions.push(activateCommand, checkCommand, deactivateCommand);

  await refreshLicense(context, false);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('zenkaiPro.licenseKey')) {
        void refreshLicense(context, false);
      }

      if (
        event.affectsConfiguration('workbench.colorTheme') ||
        event.affectsConfiguration('workbench.iconTheme') ||
        event.affectsConfiguration('workbench.productIconTheme')
      ) {
        void enforceProThemeAccess();
      }
    })
  );
}

async function refreshLicense(
  context: vscode.ExtensionContext,
  interactive: boolean
): Promise<void> {
  const key = getLicenseKey();

  // Permite testar os assets Pro durante o F5 sem exigir uma chave real.
  // ExtensionMode.Production continua protegido pela validação do Dodo.
  if (!key && context.extensionMode === vscode.ExtensionMode.Development) {
    licenseActive = true;
    return;
  }

  licenseActive = await validateOrActivateLicense(context, key);

  if (!licenseActive) {
    await enforceProThemeAccess();
    if (interactive) {
      vscode.window.showErrorMessage(
        'Zenkai Pro license is invalid or could not be verified.'
      );
    }
    return;
  }

  if (interactive) {
    await applyProThemes();
    vscode.window.showInformationMessage('Zenkai Pro activated successfully.');
  }
}

async function enforceProThemeAccess(): Promise<void> {
  if (licenseActive) {
    return;
  }

  const workbench = vscode.workspace.getConfiguration('workbench');
  const colorTheme = workbench.get<string>('colorTheme');
  const fileIconTheme = workbench.get<string>('iconTheme');
  const productIconTheme = workbench.get<string>('productIconTheme');

  if (colorTheme && PRO_COLOR_THEMES.includes(colorTheme)) {
    await workbench.update('colorTheme', FREE_COLOR_THEME, vscode.ConfigurationTarget.Global);
  }

  if (fileIconTheme === PRO_FILE_ICON_THEME) {
    await workbench.update('iconTheme', FREE_FILE_ICON_THEME, vscode.ConfigurationTarget.Global);
  }

  if (productIconTheme === PRO_PRODUCT_ICON_THEME) {
    await workbench.update(
      'productIconTheme',
      DEFAULT_PRODUCT_ICON_THEME,
      vscode.ConfigurationTarget.Global
    );
  }
}

async function applyProThemes(): Promise<void> {
  const workbench = vscode.workspace.getConfiguration('workbench');
  await workbench.update('iconTheme', PRO_FILE_ICON_THEME, vscode.ConfigurationTarget.Global);
  await workbench.update(
    'productIconTheme',
    PRO_PRODUCT_ICON_THEME,
    vscode.ConfigurationTarget.Global
  );
}

export function deactivate(): void {
  // License deactivation is exposed as an explicit command so a network call
  // is not attempted during shutdown.
}
