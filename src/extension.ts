import * as vscode from 'vscode';
import { validateLicense, isProEnabled, getLicenseKey } from './license';

const PRO_THEMES = [
  'Zenkai Stellar Abyss',
  'Zenkai Christmas'
];

export async function activate(context: vscode.ExtensionContext) {

  const activateCmd = vscode.commands.registerCommand('zenkaiTheme.activateLicense', async () => {
    const currentKey = getLicenseKey();
    const licenseKey = await vscode.window.showInputBox({
      title: 'Zenkai Pro License Activation',
      prompt: 'Enter your Zenkai Pro license key (e.g. zenkai-xxxx-xxxx-xxxx)',
      placeHolder: 'zenkai-xxxx-xxxx-xxxx',
      value: currentKey,
      ignoreFocusOut: true
    });

    if (licenseKey !== undefined) {
      const config = vscode.workspace.getConfiguration('zenkaiTheme');
      await config.update('licenseKey', licenseKey.trim(), vscode.ConfigurationTarget.Global);
      await checkLicenseStatus(true);
    }
  });

  const checkCmd = vscode.commands.registerCommand('zenkaiTheme.checkLicense', async () => {
    await checkLicenseStatus(true);
  });

  context.subscriptions.push(activateCmd, checkCmd);

  await checkLicenseStatus(false);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration('zenkaiTheme.licenseKey')) {
        await checkLicenseStatus(false);
      }
      if (event.affectsConfiguration('workbench.colorTheme')) {
        await checkProThemeAccess();
      }
    })
  );

  await checkProThemeAccess();
}

async function checkLicenseStatus(interactive: boolean): Promise<boolean> {
  const config = vscode.workspace.getConfiguration('zenkaiTheme');
  const licenseKey = getLicenseKey();

  if (!licenseKey) {
    await config.update('proEnabled', false, vscode.ConfigurationTarget.Global);
    if (interactive) {
      const selection = await vscode.window.showInformationMessage(
        'Zenkai Pro: No license key found. Activate to unlock exclusive themes!',
        'Activate License'
      );
      if (selection === 'Activate License') {
        vscode.commands.executeCommand('zenkaiTheme.activateLicense');
      }
    }
    return false;
  }

  const isValid = await validateLicense(licenseKey);

  if (isValid) {
    await config.update('proEnabled', true, vscode.ConfigurationTarget.Global);
    if (interactive) {
      vscode.window.showInformationMessage('Zenkai Pro activated successfully! All exclusive themes have been unlocked.');
    }
    return true;
  } else {
    await config.update('proEnabled', false, vscode.ConfigurationTarget.Global);
    if (interactive) {
      vscode.window.showErrorMessage('Invalid license key. Please check the code and try again.');
    }
    return false;
  }
}

async function checkProThemeAccess() {
  const currentTheme = vscode.workspace.getConfiguration('workbench').get<string>('colorTheme');

  if (currentTheme && PRO_THEMES.includes(currentTheme)) {
    const proActive = isProEnabled();
    if (!proActive) {
      const selection = await vscode.window.showWarningMessage(
        `The theme '${currentTheme}' is part of Zenkai Pro! Enter your license key to unlock full access.`,
        'Activate Zenkai Pro License',
        'Use Standard Theme'
      );

      if (selection === 'Activate Zenkai Pro License') {
        vscode.commands.executeCommand('zenkaiTheme.activateLicense');
      } else if (selection === 'Use Standard Theme') {
        await vscode.workspace.getConfiguration('workbench').update('colorTheme', 'Zenkai Dark', vscode.ConfigurationTarget.Global);
      }
    }
  }
}

export function deactivate() { }
