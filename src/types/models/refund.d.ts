import { BaseEntity } from "../interfaces/models/base-entity";
import { Order } from "./order";
import { Payment } from "./payment";
export declare enum RefundReason {
    DISCOUNT = "discount",
    RETURN = "return",
    SWAP = "swap",
    CLAIM = "claim",
    OTHER = "other"
}
export declare class Refund extends BaseEntity {
    order_id: string;
    payment_id: string;
    order: Order;
    payment: Payment;
    amount: number;
    note: string;
    reason: string;
    metadata: Record<string, unknown>;
    idempotency_key: string;
    private beforeInsert;
}
/**
 * @schema Refund
 * title: "Refund"
 * description: "Refund represent an amount of money transfered back to the Customer for a given reason. Refunds may occur in relation to Returns, Swaps and Claims, but can also be initiated by a store operator."
 * type: object
 * required:
 *   - order_id
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The refund's ID
 *     example: ref_01G1G5V27GYX4QXNARRQCW1N8T
 *   order_id:
 *     description: "The id of the Order that the Refund is related to."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   amount:
 *     description: "The amount that has be refunded to the Customer."
 *     type: integer
 *     example: 1000
 *   note:
 *     description: "An optional note explaining why the amount was refunded."
 *     type: string
 *     example: I didn't like it
 *   reason:
 *     description: "The reason given for the Refund, will automatically be set when processed as part of a Swap, Claim or Return."
 *     type: string
 *     enum:
 *       - discount
 *       - return
 *       - swap
 *       - claim
 *       - other
 *     example: return
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the refund in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
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
