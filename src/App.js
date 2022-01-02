import React from 'react';
import Main from './Page/Main';
import license from './utils/crack'
import checklogin from './function/checklogin'
import { GetCookies } from './function/getcookies'
license()

function App() {
  const [accept, setaccept] = React.useState({});
  React.useEffect(() => {
    const cockie = GetCookies()
    checklogin(cockie.token, cockie.login).then((res) => {
      if (res.login_result) {
        setaccept(res)
      }
    })
  }, [])
  return (
    <div>
      {accept.login_result ? <Main />: <React.Fragment>{"Вы не вошли, обратитесь к Администратору"}</React.Fragment>}
    </div>
  );
}

export default App;
