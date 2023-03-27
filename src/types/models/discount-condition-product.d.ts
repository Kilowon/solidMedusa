import { DiscountCondition } from "./discount-condition";
import { Product } from "./product";
export declare class DiscountConditionProduct {
    product_id: string;
    condition_id: string;
    product?: Product;
    discount_condition?: DiscountCondition;
    created_at: Date;
    updated_at: Date;
    metadata: Record<string, unknown>;
}
/**
 * @schema DiscountConditionProduct
 * title: "Product Discount Condition"
 * description: "Associates a discount condition with a product"
 * type: object
 * required:
 *   - product_id
 *   - condition_id
 * properties:
 *   product_id:
 *     description: "The ID of the Product Tag"
 *     type: string
 *     example: prod_01G1G5V2MBA328390B5AXJ610F
 *   condition_id:
 *     description: "The ID of the Discount Condition"
 *     type: string
 *     example: discon_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   product:
 *     description: Available if the relation `product` is expanded.
 *     $ref: "#/components/schemas/Product"
 *   discount_condition:
 *     description: Available if the relation `discount_condition` is expanded.
 *     $ref: "#/components/schemas/DiscountCondition"
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
