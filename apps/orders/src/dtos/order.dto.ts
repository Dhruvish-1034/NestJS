import { IsInt, IsNotEmpty } from "class-validator";

export class createOrderDTO {
    no_of_items: number;
    total_price: number;
    user: any;
}

export class updateOrderDto {
    @IsInt()
    no_of_items: number;
}
