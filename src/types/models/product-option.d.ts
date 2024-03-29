import { Product } from "./product";
import { ProductOptionValue } from "./product-option-value";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class ProductOption extends SoftDeletableEntity {
    title: string;
    values: ProductOptionValue[];
    product_id: string;
    product: Product;
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema ProductOption
 * title: "Product Option"
 * description: "Product Options define properties that may vary between different variants of a Product. Common Product Options are \"Size\" and \"Color\", but Medusa doesn't limit what Product Options that can be defined."
 * type: object
 * required:
 *   - title
 *   - product_id
 * properties:
 *   id:
 *     type: string
 *     description: The product option's ID
 *     example: opt_01F0YESHQBZVKCEXJ24BS6PCX3
 *   title:
 *     description: "The title that the Product Option is defined by (e.g. \"Size\")."
 *     type: string
 *     example: Size
 *   values:
 *     description: The Product Option Values that are defined for the Product Option. Available if the relation `values` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ProductOptionValue"
 *   product_id:
 *     description: "The ID of the Product that the Product Option is defined for."
 *     type: string
 *     example: prod_01G1G5V2MBA328390B5AXJ610F
 *   product:
 *     description: A product object. Available if the relation `product` is expanded.
 *     type: object
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
