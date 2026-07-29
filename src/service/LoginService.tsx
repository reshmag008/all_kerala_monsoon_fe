import { BACKEND_URL } from "../constants";
import axios from 'axios'


export const LoginService = () => ({

   

    validateLeagueOwnerLogin : (params:any) =>{
        return(axios.post(BACKEND_URL + "/validate_league_login", params))
    }

   
});

export default LoginService;