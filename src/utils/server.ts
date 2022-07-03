import config from "../config";
export default function server() {
  switch (config.protocol) {
    case "ssl":
      return "https://" + config.server + ":" + config.port;
    case "http":
      return "http://" + config.server + ":" + config.port;
    default:
      return "";
  }
}
