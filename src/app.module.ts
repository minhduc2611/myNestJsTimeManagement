import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksRepository } from './tasks/tasks.repository';

const username = 'leminhduc';
const password = 'leminhduc';
@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,

      url: `mongodb+srv://${username}:${password}@cluster0.9asgo.mongodb.net/nestjs-db?retryWrites=true&w=majority`,
      //   synchronize: true,
      //   useUnifiedTopology: true,
      //   entities: [Task, Pet],
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
