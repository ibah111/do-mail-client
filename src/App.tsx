import React from "react";
import { Connect } from "./Components/Connect";
import { Login } from "./Components/Login";
import Main from "./Page/Main";
import { useAppSelector } from "./Reducer";
import license from "./utils/crack";
license();
function App() {
  const [administ, setadminist] = React.useState(false);
  const [el_arhive, setel_arhive] = React.useState(false);
  const [editable, setedit] = React.useState(false);
  const [dep, setdep] = React.useState("");
  const User = useAppSelector((state) => state.User);
  React.useEffect(() => {
    if (User) {
      setadminist(User.roles.includes("admin"));
      setedit(User.roles.includes("editor"));
      setel_arhive(User.roles.includes("el_arhive"));
      setdep(User.department);
    }
  }, [User]);
  return (
    <div>
      <Connect>
        <Login>
          <Main
            administ={administ}
            el_arhive={el_arhive}
            editable={editable}
            department={dep}
          />
        </Login>
      </Connect>
    </div>
  );
}

export default App;
