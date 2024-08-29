import { IsString, Min } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @Min(4)
    name: string
}
