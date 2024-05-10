import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const useAuth = () => {
  const { handleLoggedIn } = useAuthContext();

  const signup = async (email, password, username) => {
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
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              email,
              password,
            }
          );
          console.log(response );
          const token = response.data.acesstoken;

          console.log(response.status);

          handleLoggedIn(true);

          return response.data;
          
    }catch(err){
        console.log(err.response.data.message);
        return {
          status: err.response.data.status,
          message: err.response.data.message
        }
    }
  }
  return { signup, login };
};

export default useAuth;