const io = global.io;

 
const ioController= ()=>{
    io.on("desdeFrontend", (valor)=>{
    
        console.log("send peticion from frontend");
        console.log(valor);
    })

}

module.exports=ioController;