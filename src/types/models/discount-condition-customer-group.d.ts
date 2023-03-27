import { CustomerGroup } from "./customer-group";
import { DiscountCondition } from "./discount-condition";
export declare class DiscountConditionCustomerGroup {
    customer_group_id: string;
    condition_id: string;
    customer_group?: CustomerGroup;
    discount_condition?: DiscountCondition;
    created_at: Date;
    updated_at: Date;
    metadata: Record<string, unknown>;
}
/**
 * @schema DiscountConditionCustomerGroup
 * title: "Product Tag Discount Condition"
 * description: "Associates a discount condition with a customer group"
 * type: object
 * required:
 *   - customer_group_id
 *   - condition_id
 * properties:
 *   customer_group_id:
 *     description: "The ID of the Product Tag"
 *     type: string
 *     example: cgrp_01G8ZH853Y6TFXWPG5EYE81X63
 *   condition_id:
 *     description: "The ID of the Discount Condition"
 *     type: string
 *     example: discon_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   customer_group:
 *     description: Available if the relation `customer_group` is expanded.
 *     $ref: "#/components/schemas/CustomerGroup"
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
