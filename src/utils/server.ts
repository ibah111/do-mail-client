import config from '../config/server.json';
export default function server(name?: string) {
  const node = process.env.NODE_ENV;
  const server = config.server;
  switch (name) {
    case 'oauth':
      return config.oauth;
    default:
      return server;
  }
}
