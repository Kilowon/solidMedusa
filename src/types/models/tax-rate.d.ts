import { BaseEntity } from "../interfaces/models/base-entity";
import { Product } from "./product";
import { ProductType } from "./product-type";
import { Region } from "./region";
import { ShippingOption } from "./shipping-option";
export declare class TaxRate extends BaseEntity {
    rate: number | null;
    code: string | null;
    name: string;
    region_id: string;
    region: Region;
    metadata: Record<string, unknown>;
    products: Product[];
    product_types: ProductType[];
    shipping_options: ShippingOption[];
    product_count?: number;
    product_type_count?: number;
    shipping_option_count?: number;
    private beforeInsert;
}
/**
 * @schema TaxRate
 * title: "Tax Rate"
 * description: "A Tax Rate can be used to associate a certain rate to charge on products within a given Region"
 * type: object
 * required:
 *   - name
 *   - region_id
 * properties:
 *   id:
 *     type: string
 *     description: The tax rate's ID
 *     example: txr_01G8XDBAWKBHHJRKH0AV02KXBR
 *   rate:
 *     description: "The numeric rate to charge"
 *     type: number
 *     example: 10
 *   code:
 *     description: "A code to identify the tax type by"
 *     type: string
 *     example: tax01
 *   name:
 *     description: "A human friendly name for the tax"
 *     type: string
 *     example: Tax Example
 *   region_id:
 *     type: string
 *     description: "The id of the Region that the rate belongs to"
 *     example: reg_01G1G5V26T9H8Y0M4JNE3YGA4G
 *   region:
 *     description: A region object. Available if the relation `region` is expanded.
 *     type: object
 *   products:
 *     type: array
 *     description: The products that belong to this tax rate. Available if the relation `products` is expanded.
 *     items:
 *       type: object
 *       description: A product object.
 *   product_types:
 *     type: array
 *     description: The product types that belong to this tax rate. Available if the relation `product_types` is expanded.
 *     items:
 *       type: object
 *       description: A product type object.
 *   shipping_options:
 *     type: array
 *     description: The shipping options that belong to this tax rate. Available if the relation `shipping_options` is expanded.
 *     items:
 *       type: object
 *       description: A shipping option object.
 *   product_count:
 *     description: "The count of products"
 *     type: integer
 *     example: null
 *   product_type_count:
 *     description: "The count of product types"
 *     type: integer
 *     example: null
 *   shipping_option_count:
 *     description: "The count of shipping options"
 *     type: integer
 *     example: null
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
