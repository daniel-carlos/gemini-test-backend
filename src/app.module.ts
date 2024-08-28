import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MeasureModule } from './endpoints/measures/measures.module';

@Module({
  imports: [PrismaModule, MeasureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
