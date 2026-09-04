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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLicenseKey = getLicenseKey;
exports.saveLicenseKey = saveLicenseKey;
exports.validateOrActivateLicense = validateOrActivateLicense;
exports.deactivateLicense = deactivateLicense;
const vscode = __importStar(require("vscode"));
const dodopayments_1 = __importDefault(require("dodopayments"));
const LICENSE_KEY_SETTING = 'licenseKey';
const ACTIVATION_ID_STATE = 'dodoLicenseActivationId';
function getEnvironment() {
    return process.env.ZENKAI_DODO_ENVIRONMENT === 'test_mode' ? 'test_mode' : 'live_mode';
}
function getClient() {
    // License activation and validation are Dodo's public endpoints and do not
    // require the merchant's secret API key in the extension.
    return new dodopayments_1.default({ environment: getEnvironment() });
}
function getLicenseKey() {
    return vscode.workspace
        .getConfiguration('zenkaiPro')
        .get(LICENSE_KEY_SETTING, '')
        .trim();
}
async function saveLicenseKey(key) {
    await vscode.workspace
        .getConfiguration('zenkaiPro')
        .update(LICENSE_KEY_SETTING, key.trim(), vscode.ConfigurationTarget.Global);
}
async function validateOrActivateLicense(context, licenseKey) {
    const key = licenseKey.trim();
    if (!key) {
        return false;
    }
    const client = getClient();
    try {
        const validation = await client.licenses.validate({ license_key: key });
        if (validation.valid === true) {
            return true;
        }
        const activation = await client.licenses.activate({
            license_key: key,
            name: `Zenkai Pro - ${vscode.env.machineId.slice(0, 16)}`
        });
        if (typeof activation.id !== 'string' || activation.id.length === 0) {
            return false;
        }
        await context.globalState.update(ACTIVATION_ID_STATE, activation.id);
        const postActivationValidation = await client.licenses.validate({ license_key: key });
        return postActivationValidation.valid === true;
    }
    catch {
        return false;
    }
}
async function deactivateLicense(context, licenseKey) {
    const activationId = context.globalState.get(ACTIVATION_ID_STATE);
    if (licenseKey && activationId) {
        try {
            await getClient().licenses.deactivate({
                license_key: licenseKey,
                license_key_instance_id: activationId
            });
        }
        catch {
            // Clear local state even if the network is unavailable. The activation
            // can be cleaned up from the Dodo dashboard if necessary.
        }
    }
    await context.globalState.update(ACTIVATION_ID_STATE, undefined);
}
