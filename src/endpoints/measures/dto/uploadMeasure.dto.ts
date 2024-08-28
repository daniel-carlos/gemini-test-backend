import { IsDate, IsEnum, IsNumber, IsString, IsUrl, IsUUID } from "class-validator"

export class UploadMeasureDTO {
    @IsUrl()
    imageUrl: string

    @IsString()
    customerCode: string

    @IsDate()
    date: Date

    @IsEnum(MeasureType)
    measureType: MeasureType
}