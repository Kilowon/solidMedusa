import { GiftCard } from "./gift-card";
import { Order } from "./order";
export declare class GiftCardTransaction {
    id: string;
    gift_card_id: string;
    gift_card: GiftCard;
    order_id: string;
    order: Order;
    amount: number;
    created_at: Date;
    is_taxable: boolean;
    tax_rate: number | null;
    private beforeInsert;
}
/**
 * @schema GiftCardTransaction
 * title: "Gift Card Transaction"
 * description: "Gift Card Transactions are created once a Customer uses a Gift Card to pay for their Order"
 * type: object
 * required:
 *   - gift_card_id
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The gift card transaction's ID
 *     example: gct_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   gift_card_id:
 *     description: "The ID of the Gift Card that was used in the transaction."
 *     type: string
 *     example: gift_01G8XKBPBQY2R7RBET4J7E0XQZ
 *   gift_card:
 *     description: A gift card object. Available if the relation `gift_card` is expanded.
 *     type: object
 *   order_id:
 *     description: "The ID of the Order that the Gift Card was used to pay for."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   amount:
 *     description: "The amount that was used from the Gift Card."
 *     type: integer
 *     example: 10
 *   created_at:
 *     description: "The date with timezone at which the resource was created."
 *     type: string
 *     format: date-time
 *   is_taxable:
 *     description: "Whether the transaction is taxable or not."
 *     type: boolean
 *     example: false
 *   tax_rate:
 *     description: "The tax rate of the transaction"
 *     type: number
 *     example: 0
 */
