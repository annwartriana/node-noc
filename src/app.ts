import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./database/mongo";
import { Server } from "./presentation/server";


(async ()=>{
    await main();
})();

async function main(){
    // await MongoDataBase.connect({
    //     mongoUrl: envs.MONGO_URL,
    //     dbName: envs.MONGO_DB_NAME,  
    // })

    // const prisma = new PrismaClient();
    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level:'MEDIUM'
    //     }
    // });
    // console.log(logs);
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });
    Server.start();  
}