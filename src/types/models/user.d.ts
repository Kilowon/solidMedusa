import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare enum UserRoles {
    ADMIN = "admin",
    MEMBER = "member",
    DEVELOPER = "developer"
}
export declare class User extends SoftDeletableEntity {
    role: UserRoles;
    email: string;
    first_name: string;
    last_name: string;
    password_hash: string;
    api_token: string;
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema User
 * title: "User"
 * description: "Represents a User who can manage store settings."
 * type: object
 * required:
 *   - email
 * properties:
 *   id:
 *     type: string
 *     description: The user's ID
 *     example: usr_01G1G5V26F5TB3GPAPNJ8X1S3V
 *   email:
 *     description: "The email of the User"
 *     type: string
 *     format: email
 *   first_name:
 *     description: "The first name of the User"
 *     type: string
 *     example: Levi
 *   last_name:
 *     description: "The last name of the User"
 *     type: string
 *     example: Bogan
 *   api_token:
 *     description: An API token associated with the user.
 *     type: string
 *     example: null
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
