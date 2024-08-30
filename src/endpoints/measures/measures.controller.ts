import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, RawBodyRequest, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { MeasureService } from "./measures.service";
import { UploadMeasureDTO } from "./dto/uploadMeasure.dto";
import { ConfirmMeasureDTO } from "./dto/confirmMeasure.dto";
import { FileInterceptor } from "@nestjs/platform-express";

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
    @UsePipes(new ValidationPipe())
    async upload(@Body() data: UploadMeasureDTO) {
        const result = await this.service.uploadMeasure(data);
        return {
            image_url: result.imageURL,
            measure_uuid: result.measureId,
            measure_value: result.measureValue
        };
    }

    @Patch("/confirm")
    @UsePipes(new ValidationPipe())
    async confirmMeasure(@Body() data: ConfirmMeasureDTO) {
        return await this.service.confirmMeasure(data);
    }
}