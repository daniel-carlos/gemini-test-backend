import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { MeasureService } from "./measures.service";
import { UploadMeasureDTO } from "./dto/uploadMeasure.dto";
import { ConfirmMeasureDTO } from "./dto/confirmMeasure.dto";

@Controller("measures")
export class MeasureController {
    constructor(
        private readonly service: MeasureService
    ) { }

    @Get()
    async findAll() {
        return await this.service.getAllMeasures();
    }

    @Get("/:customerId/list")
    async listCustomerMeasures(@Param('customerId', ParseUUIDPipe) customerId) {
        return `Listing all measures of customer with id = ${customerId}`;
    }

    @Post("/upload")
    @UsePipes(new ValidationPipe())
    async upload(@Body() data: UploadMeasureDTO) {
        return await this.service.uploadMeasure(data);
    }

    @Patch("/confirm")
    @UsePipes(new ValidationPipe())
    async confirmMeasure(@Body() data: ConfirmMeasureDTO) {
        return await this.service.confirmMeasure(data);
    }
}