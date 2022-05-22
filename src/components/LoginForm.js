import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function LoginForm({Login,error}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
//admin2
  const [details,setDetails]=useState({name:"",email:"",password:""});
  const submitHandler=e=>{
  e.preventDefault();
  Login(details);
  }
  
  return (
    <form onSubmit={submitHandler}>
       <div className="login-parent">
      {loading && <Loader />}
        <div className="row justify-content-center">
          <div className="col-md-4 z1">
            <div className="login-form">
              <h2>Đăng nhập</h2>
              <hr />
              <input type="email" name="email" id="email"  className="form-control" onChange={e=>setDetails({...details,email:e.target.value})} value={details.email}/>
              <input type="password" name="password" id="password"  className="form-control" onChange={e=>setDetails({...details,password:e.target.value})} value={details.password}/>
              <button className="login_btn my-3" type="submit" value="LOGIN" >Đăng nhập</button>
      
              <hr />
             
            </div>
          </div>
          <div className="col-md-5 z1">
            <lottie-player
              src="https://assets1.lottiefiles.com/packages/lf20_Jejdj9.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
          <div className="login-bottom"></div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
