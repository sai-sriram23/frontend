import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reg() {
   const [data, setData] = useState({
      username: "",
      email: "",
      password: "",
      role: "student"
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };

   const submit = async () => {
      try {
         const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, data);
         const msg = typeof res.data === "object" ? res.data.message : res.data;
         alert(msg);
         navigate("/login");
      } catch (err) {
         const errMsg = err.response?.data?.message || err.response?.data || "Registration failed. Please try again.";
         alert(errMsg);
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
         <select name="role" onChange={handleChange} value={data.role} style={{ padding: "0.5rem", width: "100%", maxWidth: "300px", margin: "0.5rem 0" }}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="principal">Principal</option>
            <option value="non teaching staff">Non Teaching Staff</option>
         </select>
         <button onClick={submit} style={{ margin: "0.5rem 0" }}>Register</button>
      </>
   );
}

export default Reg;
