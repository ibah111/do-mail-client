import React from 'react';
import Main from './Page/Main';
import license from './utils/crack'
import checklogin from './function/checklogin'

function App() {
  const [accept, setaccept] = React.useState({});
  const [administ, setadminist] = React.useState(false);
  const [el_arhive, setel_arhive] = React.useState(false);
  const [editable, setedit] = React.useState(false);
  const [dep, setdep] = React.useState(false);
  React.useEffect(() => {
    checklogin().then((res) => {
      if (res.login_result) {
        setadminist(res.admin)
        setedit(res.editor)
        setel_arhive(res.el_arhive)
        setdep(res.department)
        setaccept(res)
      }
    })
    license();
  }, [])
  return (
    <div>
      {accept.login_result ? <Main administ={administ} el_arhive={el_arhive} editable={editable} dep={dep}/>: <React.Fragment>{"Вы не вошли, обратитесь к Администратору"}</React.Fragment>}
    </div>
  );
}

export default App;
