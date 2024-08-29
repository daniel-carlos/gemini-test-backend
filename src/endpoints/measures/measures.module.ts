import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { MeasureController } from "./measures.controller";
import { MeasureService } from "./measures.service";
import { GeminiModule } from "src/gemini/gemini.module";
import { GeminiService } from "src/gemini/gemini.service";

@Module({
    imports: [PrismaModule, GeminiModule],
    controllers: [MeasureController],
    providers: [MeasureService, GeminiService]
})
export class MeasureModule {

}