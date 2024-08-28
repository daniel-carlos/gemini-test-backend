import { Controller, Get } from "@nestjs/common";
import { MeasureService } from "./measures.service";

@Controller("measures")
export class MeasureController {
    constructor(
        private readonly service: MeasureService
    ) { }

    @Get()
    async findAll() {
        return await this.service.getAllMeasures();
    }
}