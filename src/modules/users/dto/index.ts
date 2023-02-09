import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class createUserDTO {
    @ApiProperty()
    @IsString()
    firstname: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}
export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    firstname: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string
}