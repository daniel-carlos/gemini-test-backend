import { Injectable } from "@nestjs/common";
import { Customer, Measure } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UploadMeasureDTO } from "./dto/uploadMeasure.dto";
import { ConfirmMeasureDTO } from "./dto/confirmMeasure.dto";
import { GeminiService } from "src/gemini/gemini.service";
import path, { join } from "path";
import * as fs from "fs";
import { writeFile } from "fs/promises";
import { format, parse } from "date-fns";

@Injectable()
export class MeasureService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly gemini: GeminiService,
    ) { }

    async discardMeasure(measure: Measure) {
        const deletionResult = await this.prisma.measure.delete({
            where: {
                id: measure.id
            }
        });

        // const [_1, _2, path] = this.createMeasureImagePaths(measure.customerCode, measure.month, measure.year)
        // fs.unlink(path, (err) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log('File is deleted.');
        //     }
        // });
    }

    getMonthAndYear(dateString: string) {
        const parsedDate = parse(dateString, "MM-yyyy", new Date());
        return [parsedDate.getMonth() + 1, parsedDate.getFullYear()]
    }

    getMeasure(measureUUID: string) {
        return this.prisma.measure.findFirst({
            where: {
                id: measureUUID
            }
        })
    }

    getMeasureByMonthAndYear(month: number, year: number, customerId: string) {
        return this.prisma.measure.findFirst({
            where: {
                month, year, confirmed: 1, customerCode: customerId
            }
        })
    }

    getCustomerMeasures(customerCode: any) {
        return this.prisma.measure.findMany({
            where: {
                customerCode
            }
        })
    }

    confirmMeasure(data: Measure) {
        return this.prisma.measure.update({
            where: {
                id: data.id
            },
            data: {
                confirmed: 1
            }
        });
    }

    getAllMeasures() {
        return this.prisma.measure.findMany();
    }

    createMeasureImagePaths = (customerId: string, month: number, year: number) => {
        const folder = join(__dirname, `../../../uploads/${customerId}`);
        const filename = `${year}-${month}.png`;
        const path = join(__dirname, `../../../uploads/${customerId}`, filename);

        return [filename, folder, path]
    }

    async uploadMeasure(data: UploadMeasureDTO) {
        //Buscar o cliente
        const customer: Customer = await this.prisma.customer.findFirst({
            where: { id: data.customerCode }
        })

        const [month, year] = this.getMonthAndYear(data.date);

        if (customer) {
            const [filename, folder, path] = this.createMeasureImagePaths(customer.id, month, year);
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            const image = Buffer.from(data.image, 'base64');

            await writeFile(path, image);

            const measure = await this.gemini.getMeasure(path, data.measureType)
            console.log("Measure: ", measure);

            // Registrar a medida no banco
            const newMeasure = await this.prisma.measure.create({
                data: {
                    value: parseInt(measure),
                    customerCode: customer.id,
                    month: month,
                    year: year,
                    measureType: data.measureType
                }
            })



            return {
                imageURL: filename,
                measureId: newMeasure.id,
                measureValue: measure
            };
        }

    }
}