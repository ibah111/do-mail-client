import React from 'react';
import Main from './Page/Main';
import license from './utils/crack'
import checklogin from './function/checklogin'
license()

function App() {
  const [accept, setaccept] = React.useState({});
  const [administ, setadminist] = React.useState(false);
  const [el_arhive, setel_arhive] = React.useState(false);
  React.useEffect(() => {
    checklogin().then((res) => {
      if (res.login_result) {
        setaccept(res)
        setadminist(res.admin)
        setel_arhive(res.el_arhive)
      }
    })
  }, [])
  return (
    <div>
      {accept.login_result ? <Main administ={administ} el_arhive={el_arhive}/>: <React.Fragment>{"Вы не вошли, обратитесь к Администратору"}</React.Fragment>}
    </div>
  );
}

export default App;
