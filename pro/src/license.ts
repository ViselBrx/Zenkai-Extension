import * as vscode from 'vscode';
import DodoPayments from 'dodopayments';

const LICENSE_KEY_SETTING = 'licenseKey';
const ACTIVATION_ID_STATE = 'dodoLicenseActivationId';

function getEnvironment(): 'test_mode' | 'live_mode' {
  return process.env.ZENKAI_DODO_ENVIRONMENT === 'test_mode' ? 'test_mode' : 'live_mode';
}

function getClient(): DodoPayments {
  // License activation and validation are Dodo's public endpoints and do not
  // require the merchant's secret API key in the extension.
  return new DodoPayments({ environment: getEnvironment() });
}

export function getLicenseKey(): string {
  return vscode.workspace
    .getConfiguration('zenkaiPro')
    .get<string>(LICENSE_KEY_SETTING, '')
    .trim();
}

export async function saveLicenseKey(key: string): Promise<void> {
  await vscode.workspace
    .getConfiguration('zenkaiPro')
    .update(LICENSE_KEY_SETTING, key.trim(), vscode.ConfigurationTarget.Global);
}

export async function validateOrActivateLicense(
  context: vscode.ExtensionContext,
  licenseKey: string
): Promise<boolean> {
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
  } catch {
    return false;
  }
}

export async function deactivateLicense(
  context: vscode.ExtensionContext,
  licenseKey: string
): Promise<void> {
  const activationId = context.globalState.get<string>(ACTIVATION_ID_STATE);
  if (licenseKey && activationId) {
    try {
      await getClient().licenses.deactivate({
        license_key: licenseKey,
        license_key_instance_id: activationId
      });
    } catch {
      // Clear local state even if the network is unavailable. The activation
      // can be cleaned up from the Dodo dashboard if necessary.
    }
  }

  await context.globalState.update(ACTIVATION_ID_STATE, undefined);
}
