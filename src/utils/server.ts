import config from '../config/server.json';
export default function server(name?: string) {
  switch (name) {
    case 'oauth':
      return config.oauth;
    default:
      return process.env.NODE_ENV === 'prod'
        ? config.server
        : config.localserver;
  }
}
