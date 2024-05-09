import axios from "axios";
import Cookies from "js-cookie";
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
        const token = response.data.accesstoken;
        Cookies.set("token", token, { expires: 7 });
        handleLoggedIn(true);

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

          const token = response.data.acesstoken;
          Cookies.set("token", token, {expires: 7})
          handleLoggedIn(true);

          return response.data.data;
    }catch(err){
        console.log(err);
    }
  }
  return { signup, login };
};

export default useAuth;