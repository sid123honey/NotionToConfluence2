import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputid, setinputid] = useState("");
  const [inputname, setinputname] = useState("");
  const idChangeHandler = (e) => {
    const inputId = e.target.value;
    setinputid(inputId);
  };
  const nameChangeHandler = (e) => {
    const inputName = e.target.value;
    setinputname(inputName);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/n2c", { inputid, inputname })
      .then((res) => console.log("posting data"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label id>Enter Page Id</label>
          <input type="text" value={inputid} onChange={idChangeHandler}></input>
        </div>
        <div>
          <label id>Enter confluence workspace name</label>
          <input
            type="text"
            value={inputname}
            onChange={nameChangeHandler}
          ></input>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
