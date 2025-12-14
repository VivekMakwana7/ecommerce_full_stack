import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';

export enum PaymentStatus {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export class UpdatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @IsNotEmpty()
    @IsString()
    transactionId: string;

    @IsNotEmpty()
    @IsEnum(PaymentStatus)
    status: PaymentStatus;
}
