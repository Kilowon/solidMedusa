import { BaseEntity } from "../interfaces";
import { LineItem, Order, OrderItemChange, PaymentCollection } from ".";
export declare enum OrderEditStatus {
    CONFIRMED = "confirmed",
    DECLINED = "declined",
    REQUESTED = "requested",
    CREATED = "created",
    CANCELED = "canceled"
}
export declare class OrderEdit extends BaseEntity {
    order_id: string;
    order: Order;
    changes: OrderItemChange[];
    internal_note?: string;
    created_by: string;
    requested_by?: string;
    requested_at?: Date;
    confirmed_by?: string;
    confirmed_at?: Date;
    declined_by?: string;
    declined_reason?: string;
    declined_at?: Date;
    canceled_by?: string;
    canceled_at?: Date;
    items: LineItem[];
    payment_collection_id: string;
    payment_collection: PaymentCollection;
    shipping_total: number;
    discount_total: number;
    tax_total: number | null;
    total: number;
    subtotal: number;
    gift_card_total: number;
    gift_card_tax_total: number;
    difference_due: number;
    status: OrderEditStatus;
    private beforeInsert;
    loadStatus(): void;
}
/**
 * @schema OrderEdit
 * title: "Order Edit"
 * description: "Order edit keeps track of order items changes."
 * type: object
 * required:
 *   - order_id
 *   - order
 *   - changes
 *   - created_by
 * properties:
 *   id:
 *     type: string
 *     description: The order edit's ID
 *     example: oe_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order_id:
 *     type: string
 *     description: The ID of the order that is edited
 *     example: order_01G2SG30J8C85S4A5CHM2S1NS2
 *   order:
 *     description: Available if the relation `order` is expanded.
 *     $ref: "#/components/schemas/Order"
 *   changes:
 *     type: array
 *     description: Available if the relation `changes` is expanded.
 *     items:
 *       $ref: "#/components/schemas/OrderItemChange"
 *   internal_note:
 *     description: "An optional note with additional details about the order edit."
 *     type: string
 *     example: Included two more items B to the order.
 *   created_by:
 *     type: string
 *     description: "The unique identifier of the user or customer who created the order edit."
 *   requested_by:
 *     type: string
 *     description: "The unique identifier of the user or customer who requested the order edit."
 *   requested_at:
 *     type: string
 *     description: "The date with timezone at which the edit was requested."
 *     format: date-time
 *   confirmed_by:
 *     type: string
 *     description: "The unique identifier of the user or customer who confirmed the order edit."
 *   confirmed_at:
 *     type: string
 *     description: "The date with timezone at which the edit was confirmed."
 *     format: date-time
 *   declined_by:
 *     type: string
 *     description: "The unique identifier of the user or customer who declined the order edit."
 *   declined_at:
 *     type: string
 *     description: "The date with timezone at which the edit was declined."
 *     format: date-time
 *   declined_reason:
 *     description: "An optional note why  the order edit is declined."
 *     type: string
 *   subtotal:
 *     type: integer
 *     description: The total of subtotal
 *     example: 8000
 *   discount_total:
 *     type: integer
 *     description: The total of discount
 *     example: 800
 *   shipping_total:
 *     type: integer
 *     description: The total of the shipping amount
 *     example: 800
 *   gift_card_total:
 *     type: integer
 *     description: The total of the gift card amount
 *     example: 800
 *   gift_card_tax_total:
 *     type: integer
 *     description: The total of the gift card tax amount
 *     example: 800
 *   tax_total:
 *     type: integer
 *     description: The total of tax
 *     example: 0
 *   total:
 *     type: integer
 *     description: The total amount of the edited order.
 *     example: 8200
 *   difference_due:
 *     type: integer
 *     description: The difference between the total amount of the order and total amount of edited order.
 *     example: 8200
 *   status:
 *     type: string
 *     description: The status of the order edit.
 *     enum:
 *       - confirmed
 *       - declined
 *       - requested
 *       - created
 *       - canceled
 *   items:
 *     type: array
 *     description: Available if the relation `items` is expanded.
 *     items:
 *       $ref: "#/components/schemas/LineItem"
 *   payment_collection_id:
 *     type: string
 *     description: The ID of the payment collection
 *     example: paycol_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   payment_collection:
 *     description: Available if the relation `payment_collection` is expanded.
 *     $ref: "#/components/schemas/PaymentCollection"
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 */
