import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { MeasureController } from "./measures.controller";
import { MeasureService } from "./measures.service";

@Module({
    imports: [PrismaModule],
    controllers: [MeasureController],
    providers: [MeasureService]
})
export class MeasureModule {

}