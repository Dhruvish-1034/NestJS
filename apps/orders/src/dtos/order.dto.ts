import { IsInt } from "class-validator";

export class createOrderDTO {
    @IsInt()
    no_of_items: number;

    @IsInt()
    total_price: number;
}

export class updateOrderDto {
    @IsInt()
    no_of_items: number;
}
