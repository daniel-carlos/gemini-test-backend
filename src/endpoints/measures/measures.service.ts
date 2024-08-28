import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MeasureService {
    constructor(
        private readonly prisma: PrismaService
    ) { }


    getAllMeasures() {
        return this.prisma.measure.findMany();
    }

    uploadMeasure(){
        
    }
}