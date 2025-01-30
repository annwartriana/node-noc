import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./database/mongodb";
import { Server } from "./presentation/server";


(async ()=>{
    await main();
})();

async function main(){
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,  
    })

    // Ejemplo creacion de un log Prisma Postgres
    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });
    // console.log({newLog})

    // Ejemplo consulta de un log Prisma Postgres
//     const prisma = new PrismaClient();
//     const logs = await prisma.logModel.findMany({
//         where:{
//             level: 'LOW'
//         }
//     });
//    console.log(logs);


    Server.start();  
}