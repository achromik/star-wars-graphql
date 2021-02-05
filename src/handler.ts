import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';

import { initDatabaseConnection } from './database';
import { apolloServer } from './graphql/apolloServer';
import { environment } from './environment';

export const main: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = (
  event,
  context,
  callback
): void => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (environment.logStackTrace) {
    process.on('warning', (warning) => {
      console.log(warning.stack);
    });
  }

  initDatabaseConnection()
    .then(() => {
      console.log('Creating handler...');
      apolloServer.createHandler()(event, context, callback);
    })
    .catch((err) => {
      if (environment.logStackTrace) {
        console.error(err);
      }

      const errorMessage = `${err.name ? err.name + ': ' : ''}${err.message}`;
      console.error(errorMessage);
      callback(null);
    });
};
