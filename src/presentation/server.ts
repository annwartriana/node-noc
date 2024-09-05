import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasource/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasource/posgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDatasource()
//   // new MongoLogDataSource()
//   new PostgresLogDataSource()
// );

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource(),
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
);


const emailService = new EmailService();

export class Server {
  
  static async start() {
    console.log("Server started");

    // new SendEmailLogs(emailService, logRepository).execute(
    //   "andrestorres8889@gmail.com"
    // );

    CronService.createJob(
        '*/5 * * * * *',
        () => {
          const url = 'https://google.com';
          new CheckServiceMultiple(
            [ fsLogRepository, postgresLogRepository, mongoLogRepository ],
            () => console.log( `${ url } is ok` ),
            ( error ) => console.log( error ),
          ).execute( url );
        }
      );

    //GetLogs Ejemplo
    // const logsList = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logsList);
  }
}
