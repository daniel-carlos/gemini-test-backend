import { IsNumber, IsString, IsUUID } from "class-validator"


export class ConfirmMeasureDTO {
    @IsUUID()
    measure_uuid: string

    @IsNumber()
    confirmed_value: number
}