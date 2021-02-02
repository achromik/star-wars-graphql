type Environment = {
  message: string;
};

export const environment: Environment = {
  message: (process.env.MESSAGE as string) || 'Test message',
};
