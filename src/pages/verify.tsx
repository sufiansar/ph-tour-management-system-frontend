import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const verify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email] = useState(location.state);
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);
  return <div>Hello Typescript</div>;
};

export default verify;
