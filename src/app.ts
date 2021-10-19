import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";


import { router } from "./routes";

const app = express();
app.use(cors());

//Server rodando com o http
const serverHttp = http.createServer(app);

//Permite as frontes se conectem
const io = new Server(serverHttp, {
    cors:{
        origin: "*"
    }
});

io.on("connection", socket =>{
    console.log(`Usuário conectado no socket ${socket.id}`);
})

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


export { serverHttp, io };

