import querystring from 'querystring';
import {
  IDP_ENDPOINT_RETRIEVED,
  IDP_ENDPOINT_RETRIEVAL_ERROR,
} from '../config/states';
import {
  idpUrl,
  idpClientId,
  idpRedirectUrl,
} from '../config/variables';

/**
 * Retrieves IDP authorization client endpoint.
 *
 * @param {object} request http request object
 * @param {object} response http response object
 */
const idp = (request, response) => {
  let responseStatus;
  let responseState;
  let data;
  try {
    data = {
      idp: `${idpUrl}/oauth2/authorize?${querystring.stringify({
        client_id: idpClientId,
        redirect_uri: idpRedirectUrl,
        response_type: 'code',
      })}`,
    };
    responseStatus = 200;
    responseState = IDP_ENDPOINT_RETRIEVED;
  } catch (e) {
    responseStatus = 500;
    responseState = IDP_ENDPOINT_RETRIEVAL_ERROR;
  }
  response.status(responseStatus).send({
    data,
    state: responseState,
  });
};

export default idp;
