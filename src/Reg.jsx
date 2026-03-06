import React, { useState } from "react";
import axios from "axios";

function Reg() {
   const [data, setData] = useState({
      username: "",
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };

   const submit = async () => {
      try {
         const res = await axios.post("https://backend-deploy-esf9.onrender.com/register", data);
         alert(res.data);
      } catch (err) {
         alert(err.response?.data || "Registration failed. Please try again.");
      }
   };

   return (
      <>
         <h1>Register</h1>
         <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Enter username"
         />
         <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter email"
         />
         <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter password"
         />
         <button onClick={submit}>Register</button>
      </>
   );
}

export default Reg;
