import { Injectable } from "@nestjs/common";
import { Measure } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UploadMeasureDTO } from "./dto/uploadMeasure.dto";
import { ConfirmMeasureDTO } from "./dto/confirmMeasure.dto";

@Injectable()
export class MeasureService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    confirmMeasure(data: ConfirmMeasureDTO) {
        throw new Error("Method not implemented.");
    }

    getAllMeasures() {
        return this.prisma.measure.findMany();
    }

    uploadMeasure(data: UploadMeasureDTO) {
        return data;
    }
}