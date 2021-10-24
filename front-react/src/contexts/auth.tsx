import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

//Tipagem TS
type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    singOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

type AuthProvider = {
    children: ReactNode;
}



//Colocar as informações de Authentication
export function AuthProvider(props: AuthProvider) {

    const [user, setUser] = useState<User | null>(null)


    //Redirecionamento para a aplicação
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=6cda7c0a137171b730eb`

    async function singIn(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode
        })

        const { token, user } = response.data;


        localStorage.setItem('@dowhile:token', token);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user)




    }

    function singOut() {
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')

        if (token) {
            //Parar ficar authenticado
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>('profile').then(response => {
                setUser(response.data)
            })
        }

    }, []);

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes("?code=");

        if (hasGithubCode) {

            const [urlWithoutCode, githubCode] = url.split("?code=");

            //Limpar url
            window.history.pushState({}, "", urlWithoutCode)

            singIn(githubCode)

        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInUrl, user, singOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

