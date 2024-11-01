import { IntersectionType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
  import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDate,
    IsBoolean
  } from 'class-validator';
import { CreationConsumptionDetailsDto } from './consumption_details.dto';

export class CreationConsumptionDto {

    @ApiProperty({ description: 'comensal', example: 'test', required: true })
    @IsNotEmpty({ message: 'El persons de la cuenta es requerido.' })
    @IsString({ message: 'El persons de la cuenta debe ser un string.' })
    persons: string

    @ApiProperty({ description: 'accounts', example: 'test', required: true })
    @IsNotEmpty({ message: 'La accounts es requerido.' })
    @IsString({ message: 'La accounts debe ser un string.' })
    accounts: string

    @ApiPropertyOptional({ description: '10%', example: '10', required: true })
    @IsOptional({ message: 'La propina de la cuenta es optional.' })
    @IsNotEmpty({ message: 'La propina de la cuenta es requerido.' })
    @IsBoolean({ message: 'El propina de la cuenta debe ser un boolean.' })
    propina: boolean

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
export class MasterDetailsConsumptDto extends IntersectionType(CreationConsumptionDto, CreationConsumptionDetailsDto) {}
