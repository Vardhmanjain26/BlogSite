import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const Logout = () => {

   const navigate = useNavigate();

   useEffect( () => {
      window.localStorage.removeItem("jwtToken");
      navigate("/");
  });
  return (
        <div>
           Logout
        </div>);
};

export default Logout;
