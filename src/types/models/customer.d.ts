import { Address } from "./address";
import { CustomerGroup } from "./customer-group";
import { Order } from "./order";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class Customer extends SoftDeletableEntity {
    email: string;
    first_name: string;
    last_name: string;
    billing_address_id: string | null;
    billing_address: Address;
    shipping_addresses: Address[];
    password_hash: string;
    phone: string;
    has_account: boolean;
    orders: Order[];
    groups: CustomerGroup[];
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema Customer
 * title: "Customer"
 * description: "Represents a customer"
 * type: object
 * required:
 *   - email
 * properties:
 *   id:
 *     type: string
 *     description: The customer's ID
 *     example: cus_01G2SG30J8C85S4A5CHM2S1NS2
 *   email:
 *     type: string
 *     description: The customer's email
 *     format: email
 *   first_name:
 *     type: string
 *     description: The customer's first name
 *     example: Arno
 *   last_name:
 *     type: string
 *     description: The customer's last name
 *     example: Willms
 *   billing_address_id:
 *     type: string
 *     description: The customer's billing address ID
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   billing_address:
 *     description: Available if the relation `billing_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   shipping_addresses:
 *     description: Available if the relation `shipping_addresses` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Address"
 *   phone:
 *     type: string
 *     description: The customer's phone number
 *     example: 16128234334802
 *   has_account:
 *     type: boolean
 *     description: Whether the customer has an account or not
 *     default: false
 *   orders:
 *     description: Available if the relation `orders` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: An order object.
 *   groups:
 *     description: The customer groups the customer belongs to. Available if the relation `groups` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/CustomerGroup"
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
