import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { StatusModule } from './modules/status/status.module';
import { Users } from './modules/users/users.entity';
import { Tasks } from './modules/tasks/tasks.entity';
import { Status } from './modules/status/status.entity';
import { LoggerMiddleware } from './middlewares/logger.middleWare';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host: 'localhost',
    port:5432,
    username:"postgres",
    password:"iti9998",
    database: 'ITI',
    entities:[Users,Tasks,Status],
    synchronize:true
  }), UsersModule,TasksModule,StatusModule,
  ConfigModule.forRoot({
    envFilePath:".env"
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
