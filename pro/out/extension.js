"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const license_1 = require("./license");
const PRO_FILE_ICON_THEME = 'zenkai-pro-file-icons';
const PRO_PRODUCT_ICON_THEME = 'zenkai-pro-product-icons';
const PRO_COLOR_THEMES = ['Zenkai Stellar Abyss', 'Zenkai Christmas'];
const FREE_FILE_ICON_THEME = 'zenkai-seti';
const FREE_COLOR_THEME = 'Zenkai Dark';
const DEFAULT_PRODUCT_ICON_THEME = 'Default';
let licenseActive = false;
async function activate(context) {
    const activateCommand = vscode.commands.registerCommand('zenkaiPro.activateLicense', async () => {
        const key = await vscode.window.showInputBox({
            title: 'Activate Zenkai Pro',
            prompt: 'Enter your Dodo Payments license key',
            placeHolder: 'XXXX-XXXX-XXXX-XXXX',
            value: (0, license_1.getLicenseKey)(),
            ignoreFocusOut: true,
            password: true
        });
        if (key === undefined) {
            return;
        }
        await (0, license_1.saveLicenseKey)(key);
        await refreshLicense(context, true);
    });
    const checkCommand = vscode.commands.registerCommand('zenkaiPro.checkLicense', async () => {
        await refreshLicense(context, true);
    });
    const deactivateCommand = vscode.commands.registerCommand('zenkaiPro.deactivateLicense', async () => {
        const key = (0, license_1.getLicenseKey)();
        await (0, license_1.deactivateLicense)(context, key);
        await (0, license_1.saveLicenseKey)('');
        licenseActive = false;
        await enforceProThemeAccess();
        vscode.window.showInformationMessage('Zenkai Pro license deactivated.');
    });
    context.subscriptions.push(activateCommand, checkCommand, deactivateCommand);
    await refreshLicense(context, false);
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('zenkaiPro.licenseKey')) {
            void refreshLicense(context, false);
        }
        if (event.affectsConfiguration('workbench.colorTheme') ||
            event.affectsConfiguration('workbench.iconTheme') ||
            event.affectsConfiguration('workbench.productIconTheme')) {
            void enforceProThemeAccess();
        }
    }));
}
async function refreshLicense(context, interactive) {
    const key = (0, license_1.getLicenseKey)();
    // Permite testar os assets Pro durante o F5 sem exigir uma chave real.
    // ExtensionMode.Production continua protegido pela validação do Dodo.
    if (!key && context.extensionMode === vscode.ExtensionMode.Development) {
        licenseActive = true;
        return;
    }
    licenseActive = await (0, license_1.validateOrActivateLicense)(context, key);
    if (!licenseActive) {
        await enforceProThemeAccess();
        if (interactive) {
            vscode.window.showErrorMessage('Zenkai Pro license is invalid or could not be verified.');
        }
        return;
    }
    if (interactive) {
        await applyProThemes();
        vscode.window.showInformationMessage('Zenkai Pro activated successfully.');
    }
}
async function enforceProThemeAccess() {
    if (licenseActive) {
        return;
    }
    const workbench = vscode.workspace.getConfiguration('workbench');
    const colorTheme = workbench.get('colorTheme');
    const fileIconTheme = workbench.get('iconTheme');
    const productIconTheme = workbench.get('productIconTheme');
    if (colorTheme && PRO_COLOR_THEMES.includes(colorTheme)) {
        await workbench.update('colorTheme', FREE_COLOR_THEME, vscode.ConfigurationTarget.Global);
    }
    if (fileIconTheme === PRO_FILE_ICON_THEME) {
        await workbench.update('iconTheme', FREE_FILE_ICON_THEME, vscode.ConfigurationTarget.Global);
    }
    if (productIconTheme === PRO_PRODUCT_ICON_THEME) {
        await workbench.update('productIconTheme', DEFAULT_PRODUCT_ICON_THEME, vscode.ConfigurationTarget.Global);
    }
}
async function applyProThemes() {
    const workbench = vscode.workspace.getConfiguration('workbench');
    await workbench.update('iconTheme', PRO_FILE_ICON_THEME, vscode.ConfigurationTarget.Global);
    await workbench.update('productIconTheme', PRO_PRODUCT_ICON_THEME, vscode.ConfigurationTarget.Global);
}
function deactivate() {
    // License deactivation is exposed as an explicit command so a network call
    // is not attempted during shutdown.
}
