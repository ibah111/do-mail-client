import axios from 'axios';

export async function ping(url: string) {
  try {
    await axios.get(url);
    return true;
  } catch {
    return false;
  }
}
