import { IsBase64, IsEnum, IsString } from "class-validator"
import { MeasureType } from "src/types/mainTypes"
import { IsMonthYear } from "./isMonthYear"

export class UploadMeasureDTO {
    @IsString()
    image: string

    @IsString()
    customerCode: string

    @IsMonthYear()
    @IsString()
    date: string

    @IsString()
    @IsEnum(MeasureType)
    measureType: MeasureType
}