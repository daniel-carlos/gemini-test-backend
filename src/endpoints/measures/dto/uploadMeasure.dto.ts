import { IsBase64, IsDate, IsDateString, IsEnum, IsString, IsUrl } from "class-validator"
import { MeasureType } from "src/types/mainTypes"
import { IsMonthYear } from "./isMonthYear"

export class UploadMeasureDTO {
    @IsString()
    @IsBase64()
    image: string

    @IsString()
    customerCode: string

    @IsMonthYear()
    @IsString()
    date: string

    @IsString()
    measureType: string
}