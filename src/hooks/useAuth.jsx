import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Cookies from "js-cookie";

const useAuth = () => {
  const { handleLoggedIn } = useAuthContext();

  const signup = async (email, password, username) => {
    console.log(`POST ${import.meta.env.VITE_API_URL}/signup`);
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/signup`,
            {
                email,
                password,
                username
            }
        );
        // Cookies.set("token", token, { expires: 7 });
        handleLoggedIn(true);
        
        // Cookies.set("token", response.data.accesstoken, { expires: 7, sameSite:"None" });
        // Cookies.set("userId", response.data._id, { expires: 7, sameSite:"None" });
        // Cookies.set("HostedZoneId", response.data.data.HostedZoneId, { expires: 7, sameSite:"None" });
        return response.data;
    }catch (err) {
        console.log(err);
    }
  }

  const login = async (email, password) => {
    console.log(`POST ${import.meta.env.VITE_API_URL}/login`);

    try{
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              email,
              password,
            },
          );

          Cookies.set("token", response.data.accesstoken, { expires: 7, sameSite:"None" });
          Cookies.set("userId", response.data.data._id, { expires: 7, sameSite:"None" });
          Cookies.set("HostedZoneId", response?.data?.data?.HostedZoneId, { expires: 7, sameSite:"None" });

          handleLoggedIn(true);

          console.log('login resp', response);

          return response;
          
    }catch(err){

        return {
          status: err.response.status,
          message: err.response.data.message
        }
    }
  }
  return { signup, login };
};

export default useAuth;