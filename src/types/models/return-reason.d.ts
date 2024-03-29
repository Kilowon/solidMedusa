import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class ReturnReason extends SoftDeletableEntity {
    value: string;
    label: string;
    description: string;
    parent_return_reason_id: string | null;
    parent_return_reason: ReturnReason | null;
    return_reason_children: ReturnReason[];
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema ReturnReason
 * title: "Return Reason"
 * description: "A Reason for why a given product is returned. A Return Reason can be used on Return Items in order to indicate why a Line Item was returned."
 * type: object
 * required:
 *   - value
 *   - label
 * properties:
 *   id:
 *     type: string
 *     description: The cart's ID
 *     example: rr_01G8X82GCCV2KSQHDBHSSAH5TQ
 *   description:
 *     description: "A description of the Reason."
 *     type: string
 *     example: Items that are damaged
 *   label:
 *     description: "A text that can be displayed to the Customer as a reason."
 *     type: string
 *     example: Damaged goods
 *   value:
 *     description: "The value to identify the reason by."
 *     type: string
 *     example: damaged
 *   parent_return_reason_id:
 *     type: string
 *     description: The ID of the parent reason.
 *     example: null
 *   parent_return_reason:
 *     description: Available if the relation `parent_return_reason` is expanded.
 *     $ref: "#/components/schemas/ReturnReason"
 *   return_reason_children:
 *     description: Available if the relation `return_reason_children` is expanded.
 *     $ref: "#/components/schemas/ReturnReason"
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
