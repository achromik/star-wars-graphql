import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import { ApolloError } from 'apollo-server-lambda';
import { MongoError } from 'mongodb';

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

  const mongoURL = environment.mongo.url;

  initDatabaseConnection(mongoURL)
    .then(() => {
      console.log('Creating handler...');
      apolloServer.createHandler()(event, context, callback);
    })
    .catch((err: Error) => {
      if (environment.logStackTrace) {
        console.error(err);
      }

      const errorMessage = `${err.name}: ${err.message}`;
      console.error(errorMessage);

      if (err instanceof MongoError) {
        const error = new ApolloError(errorMessage, 'DB_CONNECTION_FAILED', {
          exception: { stacktrace: [err.stack?.split('\n')] },
        });

        callback(null, {
          statusCode: 503,
          body: JSON.stringify({
            errors: [
              {
                message: "Couldn't connect to database",
                extensions: error.extensions,
              },
            ],
          }),
        });
      }

      callback(null, {
        statusCode: 502,
        body: errorMessage,
      });
    });
};
