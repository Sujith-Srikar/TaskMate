import React from "react"
import axios from "axios";
import toast from "react-hot-toast";


function Dashboard() {

  function handleButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toast.promise(axios.post("http://localhost:8000/auth/logout"), {
      loading: "Loging out... Please wait! ",
      success: (res) => {
        return <b>{res.data ? res.data : "User LogedOut successfully!"}</b>;
      },
      error: (err) => {
        return (
          <b>
            {err.response ? err.response.data.message : "Could not register."}
          </b>
        );
      },
    });
  }

  return (
    <>
      <h1>Hello</h1>
      <button onClick={handleButton}>Logout</button>
    </>
  )
}

export default Dashboard
