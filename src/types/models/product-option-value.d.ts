import { ProductOption } from "./product-option";
import { ProductVariant } from "./product-variant";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class ProductOptionValue extends SoftDeletableEntity {
    value: string;
    option_id: string;
    option: ProductOption;
    variant_id: string;
    variant: ProductVariant;
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema ProductOptionValue
 * title: "Product Option Value"
 * description: "A value given to a Product Variant's option set. Product Variant have a Product Option Value for each of the Product Options defined on the Product."
 * type: object
 * required:
 *   - value
 *   - option_id
 *   - variant_id
 * properties:
 *   id:
 *     type: string
 *     description: The product option value's ID
 *     example: optval_01F0YESHR7S6ECD03RF6W12DSJ
 *   value:
 *     description: "The value that the Product Variant has defined for the specific Product Option (e.g. if the Product Option is \"Size\" this value could be \"Small\", \"Medium\" or \"Large\")."
 *     type: string
 *     example: large
 *   option_id:
 *     description: "The ID of the Product Option that the Product Option Value is defined for."
 *     type: string
 *     example: opt_01F0YESHQBZVKCEXJ24BS6PCX3
 *   option:
 *     description: Available if the relation `option` is expanded.
 *     $ref: "#/components/schemas/ProductOption"
 *   variant_id:
 *     description: "The ID of the Product Variant that the Product Option Value is defined for."
 *     type: string
 *     example: variant_01G1G5V2MRX2V3PVSR2WXYPFB6
 *   variant:
 *     description: Available if the relation `variant` is expanded.
 *     $ref: "#/components/schemas/ProductVariant"
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 *   deleted_at:
 *     type: string
 *     description: "The date with timezone at which the resource was deleted."
 *     format: date-time
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
