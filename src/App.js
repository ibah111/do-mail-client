import React from 'react';
import Main from './Page/Main';
import license from './utils/crack'
import checklogin from './function/checklogin'
license()

function App() {
  const [accept, setaccept] = React.useState({});
  React.useEffect(() => {
    checklogin().then((res) => {
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
