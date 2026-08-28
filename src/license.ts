import * as vscode from 'vscode';
import DodoPayments from 'dodopayments';

export async function validateLicense(key: string): Promise<boolean> {
  const trimmedKey = key.trim();
  if (!trimmedKey) {
    return false;
  }

  for (const environment of ['test_mode', 'live_mode'] as const) {
    try {
      const client = new DodoPayments({ environment });
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
    } catch {
      continue;
    }
  }

  return false;
}

export function isProEnabled(): boolean {
  const config = vscode.workspace.getConfiguration('zenkaiTheme');
  return config.get<boolean>('proEnabled', false);
}

export function getLicenseKey(): string {
  const config = vscode.workspace.getConfiguration('zenkaiTheme');
  return config.get<string>('licenseKey', '').trim();
}
