interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  apiUrl: string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  apiUrl: process.env.REST_API_URL as string,
};
