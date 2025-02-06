import { ShopService } from './shops.service';
import { CreateShopDto } from './models/create-shop-dto';
import { UpdateShopDto } from './models/update-shop-dtop';
export declare class ShopsController {
    private readonly shopService;
    constructor(shopService: ShopService);
    create(createShopDto: CreateShopDto): import("./models/shop").Shop;
    update(id: string, updateShopDto: UpdateShopDto): import("./models/shop").Shop;
    remove(id: string): void;
    findOne(id: string): import("./models/shop").Shop;
    findAll(): import("./models/shop").Shop[];
}
