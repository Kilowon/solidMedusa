import { DiscountCondition } from "./discount-condition";
import { ProductTag } from "./product-tag";
export declare class DiscountConditionProductTag {
    product_tag_id: string;
    condition_id: string;
    product_tag?: ProductTag;
    discount_condition?: DiscountCondition;
    created_at: Date;
    updated_at: Date;
    metadata: Record<string, unknown>;
}
/**
 * @schema DiscountConditionProductTag
 * title: "Product Tag Discount Condition"
 * description: "Associates a discount condition with a product tag"
 * type: object
 * required:
 *   - product_tag_id
 *   - condition_id
 * properties:
 *   product_tag_id:
 *     description: "The ID of the Product Tag"
 *     type: string
 *     example: ptag_01F0YESHPZYY3H4SJ3A5918SBN
 *   condition_id:
 *     description: "The ID of the Discount Condition"
 *     type: string
 *     example: discon_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   product_tag:
 *     description: Available if the relation `product_tag` is expanded.
 *     $ref: "#/components/schemas/ProductTag"
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
