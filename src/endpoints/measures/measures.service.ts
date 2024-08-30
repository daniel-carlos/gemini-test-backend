import { Injectable } from "@nestjs/common";
import { Customer, Measure } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UploadMeasureDTO } from "./dto/uploadMeasure.dto";
import { ConfirmMeasureDTO } from "./dto/confirmMeasure.dto";
import { GeminiService } from "src/gemini/gemini.service";
import { join } from "path";
import * as fs from "fs";
import { writeFile } from "fs/promises";
import { format, parse } from "date-fns";

@Injectable()
export class MeasureService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly gemini: GeminiService,
    ) { }

    getCustomerMeasures(customerCode: any) {
        return this.prisma.measure.findMany({
            where: {
                customerCode
            }
        })
    }

    confirmMeasure(data: ConfirmMeasureDTO) {
        return this.prisma.measure.update({
            where: {
                id: data.measure_uuid
            },
            data: {
                confirmed: 1
            }
        });
    }

    getAllMeasures() {
        return this.prisma.measure.findMany();
    }

    async uploadMeasure(data: UploadMeasureDTO) {
        // this.gemini.getMeasure()

        //Buscar o cliente
        const customer: Customer = await this.prisma.customer.findFirst({
            where: { id: data.customerCode }
        })

        const parsedDate = parse(data.date, "MM-yyyy", new Date());

        if (customer) {
            // Registrar a medida no banco
            const newMeasure = await this.prisma.measure.create({
                data: {
                    value: 0,
                    customerCode: customer.id,
                    month: parsedDate.getMonth() + 1,
                    year: parsedDate.getFullYear(),
                    measureType: data.measureType
                }
            })

            const folder = join(__dirname, '../../../uploads');
            const filename = `${newMeasure.id}.png`;
            const path = join(__dirname, '../../../uploads', filename);
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            const image = Buffer.from(data.image, 'base64');

            await writeFile(path, image);

            const measure = await this.gemini.getMeasure(path)
            console.log("\nMeasure: ", measure, "\n");

            return {
                imageURL: filename,
                measureId: newMeasure.id,
                measureValue: measure
            };
        }

    }
}