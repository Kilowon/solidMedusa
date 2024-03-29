import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class ClaimTag extends SoftDeletableEntity {
    value: string;
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema ClaimTag
 * title: "Claim Tag"
 * description: "Claim Tags are user defined tags that can be assigned to claim items for easy filtering and grouping."
 * type: object
 * required:
 *   - value
 * properties:
 *   id:
 *     type: string
 *     description: The claim tag's ID
 *     example: ctag_01G8ZCC5Y63B95V6B5SHBZ91S4
 *   value:
 *     description: "The value that the claim tag holds"
 *     type: string
 *     example: Damaged
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
