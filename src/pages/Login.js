import React, { useState } from "react";
import "../pages/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/Navbar";

const Login = () => {
  const[users,setUsers]=useState([]);
  const [user, setUser] = useState({
    roleId: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const { roleId, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      //http://localhost:5002/api/Users
      const response = await axios.post("http://localhost:5136/api/JWTPostUserDetailsApi/PostLoginDetails", {
        RoleId:roleId,
        EmailId:user.email,
        Password:user.password,
      });
      if(response.data.accessToken){
        alert("Login Successful");
        localStorage.setItem("user", JSON.stringify({
          
          role: roleId === "1" ? "admin" : "customer", // Convert roleId to role name
          accessToken: response.data.accessToken
        }));
        localStorage.setItem("userId",response.data.userId);
        axios.defaults.headers.common["Authorization"]=`Bearer ${response.data.accessToken}`;

        navigate("/Home");
      }else{
        alert("invalid Credentials");
      }
      //  console.log(response.data);
      //  localStorage.setItem("userId", response.data.userId);
      //  localStorage.setItem("accessToken", response.data.accessToken);
      //  debugger;
      // const person=users.find(
      //   (e)=>
      //     e.email===user.email && e.password===user.password

      // );

    //   if (response.data) {
    //   //   alert("Login successfully!!");
         
    //   //   navigate("/dashboard");
    //   // } else {
    //   //   alert("Invalid credentials");
    //   // }
    } catch (error) {
      console.error("Login error:",error.response.data|| error.message);

      alert("Login failed!!");
    }
  };

  return (
    <>
    <CustomNavbar/>
    <div className="login-container">
      
      <h2>Login</h2>
      <form className="login-form" onSubmit={onLogin}>
        <select name="roleId" value={roleId} onChange={onInputChange} required>
          {/* <option value="">Select Role</option> */}
          <option value="1">Admin</option>
          <option value="2">Customer</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={onInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;