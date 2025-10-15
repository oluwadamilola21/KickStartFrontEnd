import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  useEffect(() => {
    //  redirect to backend verify endpoint
    if (token) {
      window.location.href = `${API_BASE_URL}/verify-email?token=${token}`;
    } else {
      navigate("/signin?verified=false");
    }
  }, [token, navigate]);

  return <div className="text-center py-40">Verifying your email...</div>;
};

export default VerifyEmail;
