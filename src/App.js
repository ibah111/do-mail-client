import React from 'react';
import Main from './Page/Main';
import license from './utils/crack'
import checklogin from './function/checklogin'
license()

function App() {
  const [accept, setaccept] = React.useState({});
  const [administ, setadminist] = React.useState(false);
  const [editorist, seteditorist] = React.useState(false);
  React.useEffect(() => {
    checklogin().then((res) => {
      if (res.login_result) {
        setaccept(res)
        seteditorist(res.editors)
        setadminist(res.admins)
        console.log(res)
      }
    })
  }, [])
  return (
    <div>
      {accept.login_result ? <Main administ={administ} editorist={editorist}/>: <React.Fragment>{"Вы не вошли, обратитесь к Администратору"}</React.Fragment>}
    </div>
  );
}

export default App;
