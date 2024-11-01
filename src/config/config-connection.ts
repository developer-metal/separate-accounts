export const configConnect = {
  useFactory: () => ({
    uri: process.env.MONGO_URI
  })
};
