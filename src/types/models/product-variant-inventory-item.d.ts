import { BaseEntity } from "../interfaces/models/base-entity";
export declare class ProductVariantInventoryItem extends BaseEntity {
    inventory_item_id: string;
    variant_id: string;
    quantity: number;
    private beforeInsert;
}
