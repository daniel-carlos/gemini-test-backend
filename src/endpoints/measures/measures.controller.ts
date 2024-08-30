import { Body, Controller, Get, HttpException, Param, ParseUUIDPipe, Patch, Post, RawBodyRequest, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { MeasureService } from "./measures.service";
import { UploadMeasureDTO } from "./dto/uploadMeasure.dto";
import { ConfirmMeasureDTO } from "./dto/confirmMeasure.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ValidateDataPipe } from "src/customPipes/ShopperValidationPipe";
import { ErrorReturn } from "src/customPipes/ShopperErrorMessage";

@Controller("measures")
export class MeasureController {
    constructor(
        private readonly service: MeasureService,
    ) { }

    @Get()
    async findAll() {
        return await this.service.getAllMeasures();
    }

    @Get("/:customerCode/list")
    async listCustomerMeasures(@Param('customerCode', ParseUUIDPipe) customerCode) {
        return await this.service.getCustomerMeasures(customerCode);
    }

    @Post("/upload")
    @UsePipes(new ValidateDataPipe())
    async upload(@Body() data: UploadMeasureDTO) {
        const [month, year] = this.service.getMonthAndYear(data.date);
        const existingMeasure = await this.service.getMeasureByMonthAndYear(month, year, data.customerCode);

        if (existingMeasure) {
            throw new HttpException(ErrorReturn("DOUBLE_REPORT", "Leitura do mês já realizada"), 409);
            // return ErrorReturn("DOUBLE_REPORT", "Leitura do mês já realizada")
        }

        const result = await this.service.uploadMeasure(data);
        return {
            image_url: result.imageURL,
            measure_uuid: result.measureId,
            measure_value: result.measureValue
        };
    }

    @Patch("/confirm")
    @UsePipes(new ValidateDataPipe())
    async confirmMeasure(@Body() data: ConfirmMeasureDTO) {
        const foundMeasure = await this.service.getMeasure(data.measure_uuid);


        if (foundMeasure) {
            if (foundMeasure.confirmed === 1) {
                throw new HttpException(ErrorReturn("CONFIRMATION_DUPLICATE", "Leitura já foi confirmada"), 409);
            }
            if (data.confirmed_value === 1) {
                return await this.service.confirmMeasure(foundMeasure);
            } else {
                return await this.service.discardMeasure(foundMeasure)
            }
        } else {
            return ErrorReturn("MEASURE_NOT_FOUND", "Leitura não localizada")
        }
    }
}