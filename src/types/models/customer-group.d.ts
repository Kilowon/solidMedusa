import { Customer } from "./customer";
import { PriceList } from "./price-list";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class CustomerGroup extends SoftDeletableEntity {
    name: string;
    customers: Customer[];
    price_lists: PriceList[];
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema CustomerGroup
 * title: "Customer Group"
 * description: "Represents a customer group"
 * type: object
 * required:
 *   - name
 * properties:
 *   id:
 *     type: string
 *     description: The customer group's ID
 *     example: cgrp_01G8ZH853Y6TFXWPG5EYE81X63
 *   name:
 *     type: string
 *     description: The name of the customer group
 *     example: VIP
 *   customers:
 *     type: array
 *     description: The customers that belong to the customer group. Available if the relation `customers` is expanded.
 *     items:
 *       type: object
 *       description: A customer object.
 *   price_lists:
 *     type: array
 *     description: The price lists that are associated with the customer group. Available if the relation `price_lists` is expanded.
 *     items:
 *       $ref: "#/components/schemas/PriceList"
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
