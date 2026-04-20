export default ({ config }: { config: any }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL || 'http://localhost:4000/graphql',
      ...config.extra,
    },
  };
};
