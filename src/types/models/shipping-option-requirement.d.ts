import { ShippingOption } from "./shipping-option";
export declare enum RequirementType {
    MIN_SUBTOTAL = "min_subtotal",
    MAX_SUBTOTAL = "max_subtotal"
}
export declare class ShippingOptionRequirement {
    id: string;
    shipping_option_id: string;
    shipping_option: ShippingOption;
    type: RequirementType;
    amount: number;
    deleted_at: Date;
    private beforeInsert;
}
/**
 * @schema ShippingOptionRequirement
 * title: "Shipping Option Requirement"
 * description: "A requirement that a Cart must satisfy for the Shipping Option to be available to the Cart."
 * type: object
 * required:
 *   - shipping_option_id
 *   - type
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The shipping option requirement's ID
 *     example: sor_01G1G5V29AB4CTNDRFSRWSRKWD
 *   shipping_option_id:
 *     description: "The id of the Shipping Option that the hipping option requirement belongs to"
 *     type: string
 *     example: so_01G1G5V27GYX4QXNARRQCW1N8T
 *   shipping_option:
 *     description: Available if the relation `shipping_option` is expanded.
 *     $ref: "#/components/schemas/ShippingOption"
 *   type:
 *     description: "The type of the requirement, this defines how the value will be compared to the Cart's total. `min_subtotal` requirements define the minimum subtotal that is needed for the Shipping Option to be available, while the `max_subtotal` defines the maximum subtotal that the Cart can have for the Shipping Option to be available."
 *     type: string
 *     enum:
 *       - min_subtotal
 *       - max_subtotal
 *     example: min_subtotal
 *   amount:
 *     description: "The amount to compare the Cart subtotal to."
 *     type: integer
 *     example: 100
 *   deleted_at:
 *     type: string
 *     description: "The date with timezone at which the resource was deleted."
 *     format: date-time
 */
