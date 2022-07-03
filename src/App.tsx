import React from "react";
import { Connect } from "./Components/Connect";
import { Login } from "./Components/Login";
import Main from "./Page/Main";
import { useAppSelector } from "./Reducer";
import license from "./utils/crack";
license();
function App() {
  return (
    <div>
      <Connect>
        <Login>
          <Main />
        </Login>
      </Connect>
    </div>
  );
}

export default App;
