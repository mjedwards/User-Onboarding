import React, { useState } from "react";
import "./App.css";

import FormikOnBoardForm from "./components/Form";

function App() {
  const { users, setUsers } = useState({});

  const newUser = user => {
    const addUser = setUsers([...users, user]);
  };
  return (
    <div className='App'>
      <FormikOnBoardForm newUser={newUser} />
    </div>
  );
}

export default App;
