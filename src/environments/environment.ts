import { inject } from '@angular/core';
import config from '../../app_config.json';

const { apiUrl, auth: { domain, clientId, authorizationParams: { audience } } } = config as {
     apiUrl: string,
     auth: {
          domain: string,
          clientId: string,
          authorizationParams : {
               audience : string,
          }
     }
}


export const environment = {
     production : false,
     apiUrl : apiUrl,
     auth : {
          domain : domain,
          clientId : clientId,
          authorizationParams : {
               audience : audience,
               
          },
          
     },
     httpInterceptor: {
          allowedList: [`${apiUrl}/*`],
     },

}