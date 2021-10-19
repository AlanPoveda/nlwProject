import "dotenv/config";
import express, { response } from "express";


import { router } from "./routes";

const app = express();

//Para ele pegar a request do body para poder pegar o code
app.use(express.json())

//Usando a rota criada
app.use(router);

//Route Github para fazer a sua autenticação
app.get("/github", (req,res)=>{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

//Rota que redireciona depois da autenticação
app.get("/signin/callback", (req,res)=>{
    //Pegar o codigo de autenticação que é gerado pelo próprio git
    const { code } =  req.query;

    return res.json(code);
});


app.listen(4000, ()=>{
    console.log("🎉 Server is run in port 4000");
})

