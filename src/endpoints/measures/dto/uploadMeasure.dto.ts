import { IsDate, IsDateString, IsEnum, IsString, IsUrl } from "class-validator"
import { MeasureType } from "src/types/mainTypes"

export class UploadMeasureDTO {
    @IsUrl()
    imageUrl: string

    @IsString()
    customerCode: string

    @IsDateString()
    date: Date

    @IsEnum(MeasureType)
    measureType: string
}