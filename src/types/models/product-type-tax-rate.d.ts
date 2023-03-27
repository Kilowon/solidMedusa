import { ProductType } from "./product-type";
import { TaxRate } from "./tax-rate";
export declare class ProductTypeTaxRate {
    product_type_id: string;
    rate_id: string;
    product_type?: ProductType;
    tax_rate?: TaxRate;
    created_at: Date;
    updated_at: Date;
    metadata: Record<string, unknown>;
}
/**
 * @schema ProductTypeTaxRate
 * title: "Product Type Tax Rate"
 * description: "Associates a tax rate with a product type to indicate that the product type is taxed in a certain way"
 * type: object
 * required:
 *   - product_type_id
 *   - rate_id
 * properties:
 *   product_type_id:
 *     description: "The ID of the Product type"
 *     type: string
 *     example: ptyp_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   product_type:
 *     description: Available if the relation `product_type` is expanded.
 *     $ref: "#/components/schemas/ProductType"
 *   rate_id:
 *     description: "The id of the Tax Rate"
 *     type: string
 *     example: txr_01G8XDBAWKBHHJRKH0AV02KXBR
 *   tax_rate:
 *     description: Available if the relation `tax_rate` is expanded.
 *     $ref: "#/components/schemas/TaxRate"
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
