import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/InitialSlice";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSignout = async () => {
    try {
     
      const response = await axios.get("http://localhost:3000/api/auth/signOut");
      if (response.status == 200) {
        message.success("Signuot");
        dispatch(setCurrentUser(false));
        navigate('/')
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="text-red" onClick={handleSignout}>
      Signout
    </button>
  );
};

export default Signout;
