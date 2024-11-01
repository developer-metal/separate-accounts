export const configLoader = () => ({
  port: process.env.PORT,
  endpoint_accounts: process.env.HOST + '/accounts',
  endpoint_consumption: process.env.HOST + '/consumption'
});