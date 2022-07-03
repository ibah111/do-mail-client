export interface Token {
  token: string;
}
export const GetCookies = () => {
  const result: Token = {
    token: (document.querySelector('meta[name="token"]') as HTMLMetaElement)
      .content,
  };
  return result;
};
