import axios from "axios";

/**
 * Receber code(string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o usuario existe no DB
 * ----SIM =  Gera um token
 * ----Não =  Cria no DB, gera um token
 * ----Return o token com as info do user
 */

//Aqui nesta interface ele pega somente só o Token que precisa
interface IAccessTokenResponse{
    access_token: string
}

//Aqui ele pega somente as informações que ele quer realmente do user
interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService{
    async execute(code: string){
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params:{
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SCRIPT,
                code,
            },
            headers:{
                "Accept": "application/json"
            }
        });
        
        //Pegar as informações do user com authentication
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers:{
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        return response.data;

    }

}

export { AuthenticateUserService }