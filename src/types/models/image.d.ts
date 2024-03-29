import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare class Image extends SoftDeletableEntity {
    url: string;
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema Image
 * title: "Image"
 * description: "Images holds a reference to a URL at which the image file can be found."
 * type: object
 * required:
 *   - url
 * properties:
 *   id:
 *     type: string
 *     description: The image's ID
 *     example: img_01G749BFYR6T8JTVW6SGW3K3E6
 *   url:
 *     description: "The URL at which the image file can be found."
 *     type: string
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
