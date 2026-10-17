import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

export const base44 = createClient({
  appId: appId || '6a99a526b6f8be408ecdca4a',
  token,
  functionsVersion,
  serverUrl: 'https://base44.app',
  appBaseUrl
});