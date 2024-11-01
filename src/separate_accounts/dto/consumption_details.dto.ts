import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
  import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDate,
    IsArray,
    ValidateNested,
    ArrayNotEmpty
  } from 'class-validator';
  export class DataConsumit{
    @ApiProperty({ description: 'Description product', example: 'churrasco', required: true })
    @IsNotEmpty({ message: 'El product_gloss de la cuenta es requerido.' })
    @IsString({ message: 'El product_gloss de la cuenta debe ser un string.' })
    product_gloss: string

    @ApiProperty({ description: 'Description product', example: 'churrasco', required: true })
    @IsNotEmpty({ message: 'El count de la cuenta es requerido.' })
    @IsString({ message: 'El count de la cuenta debe ser un string.' })
    count: string

    @ApiProperty({ description: 'Precio unitario', example: '1.500', required: true })
    @IsNotEmpty({ message: 'El unit_value de la cuenta es requerido.' })
    @IsString({ message: 'El unit_value de la cuenta debe ser un string.' })
    unit_value: string
  }
export class CreationConsumptionDetailsDto {
  
    @ApiProperty({ description: 'contiene data de gastos',required: true})
    @IsArray({ message: 'Los data_comsumit de los gatos deben ser Array' })
    @ValidateNested({ each: true })
    @ArrayNotEmpty({ message: 'Los data_comsumit no pueden estar vacios.'})
    @Type(() => DataConsumit)
    data_consumit: DataConsumit[];

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