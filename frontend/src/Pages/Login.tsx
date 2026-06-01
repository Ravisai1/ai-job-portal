import React, { useState } from "react";

import api from "../Api/axios";
const Login: React.FC=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");

    const handleLogin = async(e: React.FormEvent) => {
      e.preventDefault();
      try{
        const response = await api.post("/auth/login",{
            email,
            password
        });
        if(response.data.token){
        const {token} =response.data;
        // console.log(response);
        console.log(localStorage.setItem("token",token));
        alert("Login successfully");
        }else{
            alert("Invalid Credentials");
        }
    }catch(error){
        console.error("Login failed:", error);
        alert("Login failed");

    }
 }
    return(
        <div className="login-container">
            <h2>Login</h2> 
            <form  onSubmit={handleLogin} >
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form> 
        </div>
    );
}
export default Login;