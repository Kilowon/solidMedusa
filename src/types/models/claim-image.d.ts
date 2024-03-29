import { ClaimItem } from "./claim-item";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class ClaimImage extends SoftDeletableEntity {
    claim_item_id: string;
    claim_item: ClaimItem;
    url: string;
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema ClaimImage
 * title: "Claim Image"
 * description: "Represents photo documentation of a claim."
 * type: object
 * required:
 *  - claim_item_id
 *  - url
 * properties:
 *   id:
 *     type: string
 *     description: The claim image's ID
 *     example: cimg_01G8ZH853Y6TFXWPG5EYE81X63
 *   claim_item_id:
 *     type: string
 *     description: The ID of the claim item associated with the image
 *   claim_item:
 *     description: A claim item object. Available if the relation `claim_item` is expanded.
 *     type: object
 *   url:
 *     type: string
 *     description: The URL of the image
 *     format: uri
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
