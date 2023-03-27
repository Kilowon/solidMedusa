import { BaseEntity } from "../interfaces/models/base-entity";
import { Currency } from "./currency";
import { SalesChannel } from "./sales-channel";
export declare class Store extends BaseEntity {
    name: string;
    default_currency_code: string;
    default_currency: Currency;
    currencies: Currency[];
    swap_link_template: string | null;
    payment_link_template: string | null;
    invite_link_template: string | null;
    default_location_id: string;
    metadata: Record<string, unknown> | null;
    default_sales_channel_id: string | null;
    default_sales_channel: SalesChannel;
    private beforeInsert;
}
/**
 * @schema Store
 * title: "Store"
 * description: "Holds settings for the Store, such as name, currencies, etc."
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The store's ID
 *     example: store_01G1G5V21KADXNGH29BJMAJ4B4
 *   name:
 *     description: "The name of the Store - this may be displayed to the Customer."
 *     type: string
 *     example: Medusa Store
 *   default_currency_code:
 *     description: "The 3 character currency code that is the default of the store."
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   default_currency:
 *     description: Available if the relation `default_currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   currencies:
 *     description: The currencies that are enabled for the Store. Available if the relation `currencies` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Currency"
 *   swap_link_template:
 *     description: "A template to generate Swap links from. Use {{cart_id}} to include the Swap's `cart_id` in the link."
 *     type: string
 *     example: null
 *   payment_link_template:
 *     description: "A template to generate Payment links from. Use {{cart_id}} to include the payment's `cart_id` in the link."
 *     type: string
 *     example: null
 *   invite_link_template:
 *     description: "A template to generate Invite links from"
 *     type: string
 *     example: null
 *   default_sales_channel_id:
 *     type: string
 *     description: The sales channel ID the cart is associated with.
 *     example: null
 *   default_sales_channel:
 *     description: A sales channel object. Available if the relation `default_sales_channel` is expanded.
 *     type: object
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
