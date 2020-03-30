/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import querystring from 'querystring';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  AUTHORIZATION_CODE_MISSING,
  AUTHORIZATION_CODE_ENDPOINT_ERROR,
  OAUTH_TOKENS_RETRIEVED,
} from '../config/states';
import {
  idpClientAuthorization,
  idpUrl,
  idpClientId,
  idpRedirectUrl,
} from '../config/variables';


/**
 * Exchanges an OAuth2 authorization code for OAuth2 tokens.
 *
 * @param {object} request http request object
 * @param {object} response http response object
 */
const token = async (request, response) => {
  let responseStatus;
  let responseState;
  let data;
  if (!request.body.code) {
    responseStatus = 400;
    responseState = AUTHORIZATION_CODE_MISSING;
  } else {
    try {
      const tokenResponse = await axios({
        method: 'POST',
        url: `${idpUrl}/oauth2/token`,
        data: querystring.stringify({
          grant_type: 'authorization_code',
          client_id: idpClientId,
          code: request.body.code,
          redirect_uri: idpRedirectUrl,
        }),
        headers: {
          Authorization: `Basic ${idpClientAuthorization}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      responseStatus = 200;
      responseState = OAUTH_TOKENS_RETRIEVED;
      data = tokenResponse.data;
      const decoded = jwtDecode(data.id_token);
      data.given_name = decoded.given_name;
      data.family_name = decoded.family_name;
      data.userID = decoded.sub;
    } catch (e) {
      try {
        data = { error: e.response.data.error || '' };
      } catch {}
      responseStatus = 500;
      responseState = AUTHORIZATION_CODE_ENDPOINT_ERROR;
    }
  }
  response.status(responseStatus).send({
    data,
    state: responseState,
  });
};

export default token;
