import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
import { Currency, Payment, PaymentSession, Region } from ".";
export declare enum PaymentCollectionStatus {
    NOT_PAID = "not_paid",
    AWAITING = "awaiting",
    AUTHORIZED = "authorized",
    PARTIALLY_AUTHORIZED = "partially_authorized",
    CANCELED = "canceled"
}
export declare enum PaymentCollectionType {
    ORDER_EDIT = "order_edit"
}
export declare class PaymentCollection extends SoftDeletableEntity {
    type: PaymentCollectionType;
    status: PaymentCollectionStatus;
    description: string | null;
    amount: number;
    authorized_amount: number | null;
    region_id: string;
    region: Region;
    currency_code: string;
    currency: Currency;
    payment_sessions: PaymentSession[];
    payments: Payment[];
    metadata: Record<string, unknown>;
    created_by: string;
    private beforeInsert;
}
/**
 * @schema PaymentCollection
 * title: "Payment Collection"
 * description: "Payment Collection"
 * type: object
 * required:
 *   - type
 *   - status
 *   - amount
 *   - region_id
 *   - currency_code
 *   - created_by
 * properties:
 *   id:
 *     type: string
 *     description: The payment collection's ID
 *     example: paycol_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   type:
 *     type: string
 *     description: The type of the payment collection
 *     enum:
 *       - order_edit
 *   status:
 *     type: string
 *     description: The type of the payment collection
 *     enum:
 *       - not_paid
 *       - awaiting
 *       - authorized
 *       - partially_authorized
 *       - canceled
 *   description:
 *     type: string
 *     description: Description of the payment collection
 *   amount:
 *     type: number
 *     description: Amount of the payment collection.
 *   authorized_amount:
 *     type: number
 *     description: Authorized amount of the payment collection.
 *   region_id:
 *     type: string
 *     description: The region's ID
 *     example: reg_01G1G5V26T9H8Y0M4JNE3YGA4G
 *   region:
 *     description: Available if the relation `region` is expanded.
 *     $ref: "#/components/schemas/Region"
 *   currency_code:
 *     description: "The 3 character ISO code for the currency."
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   currency:
 *     description: Available if the relation `currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   payment_sessions:
 *     type: array
 *     description: Available if the relation `payment_sessions` is expanded.
 *     items:
 *       $ref: "#/components/schemas/PaymentSession"
 *   payments:
 *     type: array
 *     description: Available if the relation `payments` is expanded.
 *     items:
 *       $ref: "#/components/schemas/Payment"
 *   created_by:
 *     type: string
 *     description: "The ID of the user that created the payment collection."
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
