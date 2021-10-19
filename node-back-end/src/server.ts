import { serverHttp } from "./app";

serverHttp.listen(4000, ()=>{
    console.log("🎉 Server is run in port 4000");
})