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
exports.validateLicense = validateLicense;
exports.isProEnabled = isProEnabled;
exports.getLicenseKey = getLicenseKey;
const vscode = __importStar(require("vscode"));
const dodopayments_1 = __importDefault(require("dodopayments"));
async function validateLicense(key) {
    const trimmedKey = key.trim();
    if (!trimmedKey) {
        return false;
    }
    for (const environment of ['test_mode', 'live_mode']) {
        try {
            const client = new dodopayments_1.default({ environment });
            const validation = await client.licenses.validate({ license_key: trimmedKey });
            if (validation.valid === true) {
                return true;
            }
            const activation = await client.licenses.activate({
                license_key: trimmedKey,
                name: 'Zenkai VS Code Extension'
            });
            if (typeof activation.id === 'string' && activation.id.length > 0) {
                return true;
            }
        }
        catch {
            continue;
        }
    }
    return false;
}
function isProEnabled() {
    const config = vscode.workspace.getConfiguration('zenkaiTheme');
    return config.get('proEnabled', false);
}
function getLicenseKey() {
    const config = vscode.workspace.getConfiguration('zenkaiTheme');
    return config.get('licenseKey', '').trim();
}
//# sourceMappingURL=license.js.map