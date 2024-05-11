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
          console.log(response );

          Cookies.set("token", response.data.accesstoken, { expires: 7 });

          handleLoggedIn(true);

          return response.data;
          
    }catch(err){
        console.log(err);

        return {
          status: 401,
          message: err.message
        }
    }
  }
  return { signup, login };
};

export default useAuth;