import config from '../config/server.json';
export default function server(name?: string) {
  const node = process.env.NODE_ENV;
  const server = node === 'prod' ? config.server : config.localserver;
  switch (name) {
    case 'oauth':
      return config.oauth;
    default:
      return server;
  }
}
