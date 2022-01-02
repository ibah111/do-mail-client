import Cookies from 'js-cookie'

const cookies = Cookies.withConverter({
    write: (value, name) => encodeURIComponent(value),
    read: (value, name) => decodeURIComponent(value)
})

export const GetCookies = () => {

  const token = cookies.get('BITRIX_SM_UIDH')
  const login = cookies.get('BITRIX_SM_UIDL')
  const result = { token: token, login: login }
  return result
}