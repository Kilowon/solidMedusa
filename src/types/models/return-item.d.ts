import { LineItem } from "./line-item";
import { Return } from "./return";
import { ReturnReason } from "./return-reason";
export declare class ReturnItem {
    return_id: string;
    item_id: string;
    return_order: Return;
    item: LineItem;
    quantity: number;
    is_requested: boolean;
    requested_quantity: number;
    received_quantity: number;
    reason_id: string;
    reason: ReturnReason;
    note: string;
    metadata: Record<string, unknown>;
}
/**
 * @schema ReturnItem
 * title: "Return Item"
 * description: "Correlates a Line Item with a Return, keeping track of the quantity of the Line Item that will be returned."
 * type: object
 * required:
 *   - return_id
 *   - item_id
 * properties:
 *   return_id:
 *     description: "The id of the Return that the Return Item belongs to."
 *     type: string
 *     example: ret_01F0YET7XPCMF8RZ0Y151NZV2V
 *   return_order:
 *     description: Available if the relation `return_order` is expanded.
 *     $ref: "#/components/schemas/Return"
 *   item_id:
 *     description: "The id of the Line Item that the Return Item references."
 *     type: string
 *     example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   item:
 *     description: Available if the relation `item` is expanded.
 *     $ref: "#/components/schemas/LineItem"
 *   quantity:
 *     description: "The quantity of the Line Item that is included in the Return."
 *     type: integer
 *     example: 1
 *   is_requested:
 *     description: "Whether the Return Item was requested initially or received unexpectedly in the warehouse."
 *     type: boolean
 *     default: true
 *   requested_quantity:
 *     description: "The quantity that was originally requested to be returned."
 *     type: integer
 *     example: 1
 *   recieved_quantity:
 *     description: "The quantity that was received in the warehouse."
 *     type: integer
 *     example: 1
 *   reason_id:
 *     description: The ID of the reason for returning the item.
 *     type: string
 *     example: rr_01G8X82GCCV2KSQHDBHSSAH5TQ
 *   reason:
 *     description: Available if the relation `reason` is expanded.
 *     $ref: "#/components/schemas/ReturnReason"
 *   note:
 *     description: "An optional note with additional details about the Return."
 *     type: string
 *     example: I didn't like it.
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
