import { Fulfillment } from "./fulfillment";
import { LineItem } from "./line-item";
export declare class FulfillmentItem {
    fulfillment_id: string;
    item_id: string;
    fulfillment: Fulfillment;
    item: LineItem;
    quantity: number;
}
/**
 * @schema FulfillmentItem
 * title: "Fulfillment Item"
 * description: "Correlates a Line Item with a Fulfillment, keeping track of the quantity of the Line Item."
 * type: object
 * required:
 *   - fulfillment_id
 *   - item_id
 *   - quantity
 * properties:
 *   fulfillment_id:
 *     description: "The id of the Fulfillment that the Fulfillment Item belongs to."
 *     type: string
 *     example: ful_01G8ZRTMQCA76TXNAT81KPJZRF
 *   item_id:
 *     description: "The id of the Line Item that the Fulfillment Item references."
 *     type: string
 *     example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   fulfillment:
 *     description: A fulfillment object. Available if the relation `fulfillment` is expanded.
 *     type: object
 *   item:
 *     description: Available if the relation `item` is expanded.
 *     $ref: "#/components/schemas/LineItem"
 *   quantity:
 *     description: "The quantity of the Line Item that is included in the Fulfillment."
 *     type: integer
 *     example: 1
 */
