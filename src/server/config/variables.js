import { Base64 } from 'js-base64';

export const idpUrl = process.env.IDP_URL;
export const idpClientId = process.env.IDP_CLIENT_ID;
export const idpClientSecret = process.env.IDP_CLIENT_SECRET;
export const idpRedirectUrl = process.env.IDP_REDIRECT_URL;
export const idpClientAuthorization = Base64.encode(`${idpClientId}:${idpClientSecret}`);
