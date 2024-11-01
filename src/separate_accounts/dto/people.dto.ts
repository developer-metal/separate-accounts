import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsString,IsNotEmpty,IsOptional, IsDate, IsBoolean } from 'class-validator';
export class PeopleDto { 

    @ApiProperty({ description: 'Name people', example: 'pepe', required: true })
    @IsNotEmpty({ message: 'El name de la persona es requerido.' })
    @IsString({ message: 'El name de la persona debe ser un string.' })
    name: string

    @ApiProperty({ description: 'Rut persona', example: '19206522', required: true })
    @IsNotEmpty({ message: 'El rut de la persona es requerido.' })
    @IsString({ message: 'El rut de la persona debe ser un string.' })
    rut: string

    @ApiProperty({ description: 'status_register', example: 'status cuenta', required: false })
    @IsOptional({ message: 'status_register.' })
    @IsNotEmpty({ message: 'El status_register de la persona es requerido.' })
    @IsBoolean({ message: 'El status_register de la persona debe ser un boolean.' })
    status_register: boolean

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