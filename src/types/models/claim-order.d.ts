import { Address } from "./address";
import { ClaimItem } from "./claim-item";
import { Fulfillment } from "./fulfillment";
import { LineItem } from "./line-item";
import { Order } from "./order";
import { Return } from "./return";
import { ShippingMethod } from "./shipping-method";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare enum ClaimType {
    REFUND = "refund",
    REPLACE = "replace"
}
export declare enum ClaimPaymentStatus {
    NA = "na",
    NOT_REFUNDED = "not_refunded",
    REFUNDED = "refunded"
}
export declare enum ClaimFulfillmentStatus {
    NOT_FULFILLED = "not_fulfilled",
    PARTIALLY_FULFILLED = "partially_fulfilled",
    FULFILLED = "fulfilled",
    PARTIALLY_SHIPPED = "partially_shipped",
    SHIPPED = "shipped",
    PARTIALLY_RETURNED = "partially_returned",
    RETURNED = "returned",
    CANCELED = "canceled",
    REQUIRES_ACTION = "requires_action"
}
export declare class ClaimOrder extends SoftDeletableEntity {
    payment_status: ClaimPaymentStatus;
    fulfillment_status: ClaimFulfillmentStatus;
    claim_items: ClaimItem[];
    additional_items: LineItem[];
    type: ClaimType;
    order_id: string;
    order: Order;
    return_order: Return;
    shipping_address_id: string;
    shipping_address: Address;
    shipping_methods: ShippingMethod[];
    fulfillments: Fulfillment[];
    refund_amount: number;
    canceled_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    no_notification: boolean;
    metadata: Record<string, unknown>;
    idempotency_key: string;
    private beforeInsert;
}
/**
 * @schema ClaimOrder
 * title: "Claim Order"
 * description: "Claim Orders represent a group of faulty or missing items. Each claim order consists of a subset of items associated with an original order, and can contain additional information about fulfillments and returns."
 * type: object
 * required:
 *   - type
 *   - order_id
 * properties:
 *   id:
 *     type: string
 *     description: The claim's ID
 *     example: claim_01G8ZH853Y6TFXWPG5EYE81X63
 *   type:
 *     type: string
 *     enum:
 *       - refund
 *       - replace
 *   payment_status:
 *     type: string
 *     description: The status of the claim's payment
 *     enum:
 *       - na
 *       - not_refunded
 *       - refunded
 *     default: na
 *   fulfillment_status:
 *     type: string
 *     enum:
 *       - not_fulfilled
 *       - partially_fulfilled
 *       - fulfilled
 *       - partially_shipped
 *       - shipped
 *       - partially_returned
 *       - returned
 *       - canceled
 *       - requires_action
 *     default: not_fulfilled
 *   claim_items:
 *     description: "The items that have been claimed"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ClaimItem"
 *   additional_items:
 *     description: "Refers to the new items to be shipped when the claim order has the type `replace`"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/LineItem"
 *   order_id:
 *     description: "The ID of the order that the claim comes from."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   return_order:
 *     description: "A return object. Holds information about the return if the claim is to be returned. Available if the relation 'return_order' is expanded"
 *     type: object
 *   shipping_address_id:
 *     description: "The ID of the address that the new items should be shipped to"
 *     type: string
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   shipping_address:
 *     description: Available if the relation `shipping_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   shipping_methods:
 *     description: "The shipping methods that the claim order will be shipped with."
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ShippingMethod"
 *   fulfillments:
 *     description: "The fulfillments of the new items to be shipped"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Fulfillment"
 *   refund_amount:
 *     description: "The amount that will be refunded in conjunction with the claim"
 *     type: integer
 *     example: 1000
 *   canceled_at:
 *     description: "The date with timezone at which the claim was canceled."
 *     type: string
 *     format: date-time
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
 *   no_notification:
 *     description: "Flag for describing whether or not notifications related to this should be send."
 *     type: boolean
 *     example: false
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the cart associated with the claim in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 */
