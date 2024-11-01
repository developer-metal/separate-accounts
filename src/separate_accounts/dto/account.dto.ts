import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
  import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDate,
    IsBoolean
  } from 'class-validator';
export class CreateSeparateAccountDto { 
    @ApiProperty({ description: 'Name Account', example: 'Mesa-0001', required: true })
    @IsNotEmpty({ message: 'El name de la cuenta es requerido.' })
    @IsString({ message: 'El name de la cuenta debe ser un string.' })
    name: string

    @ApiProperty({ description: 'Place', example: 'Fuente Alemana', required: true })
    @IsNotEmpty({ message: 'El place de la cuenta es requerido.' })
    @IsString({ message: 'El place de la cuenta debe ser un string.' })
    place: string

    @ApiPropertyOptional({ description: 'Place', example: 'Fuente Alemana', required: false })
    @IsOptional({ message: 'El total_account de la cuenta es requerido.' })
    @IsNotEmpty({ message: 'El place de la cuenta es requerido.' })
    @IsString({ message: 'El place de la cuenta debe ser un string.' })
    total_account: string

    @ApiProperty({ description: 'status account', example: 'status cuenta', required: false })
    @IsOptional({ message: 'status_account.' })
    @IsNotEmpty({ message: 'El status_account de la cuenta es requerido.' })
    @IsBoolean({ message: 'El status_account de la cuenta debe ser un boolean.' })
    status_account: boolean

    @ApiProperty({ description: 'date creation', example: '2024-09-16', required: false })
    @IsOptional({ message: 'Fecha de creacion registro es optional.' })
    @IsNotEmpty({ message: 'La Fecha creacion registro es requerida.' })
    @IsDate({ message: 'La Fecha es de tipo DATE.' })
    @Type(() => Date)
    readonly creationDate: Date;

    @ApiProperty({ description: 'status account', example: '2024-09-16', required: false })
    @IsOptional({ message: 'Fecha de actualizacion registro es optional.' })
    @IsNotEmpty({ message: 'La Fecha actualizacion registro es requerida.' })
    @IsDate({ message: 'La Fecha es de tipo DATE.' })
    @Type(() => Date)
    readonly updateDate: Date;
}
export class AccountCloudDto extends PartialType(CreateSeparateAccountDto) {}
