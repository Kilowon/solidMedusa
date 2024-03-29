import { SoftDeletableEntity } from "../interfaces";
export declare class SalesChannel extends SoftDeletableEntity {
    name: string;
    description: string | null;
    is_disabled: boolean;
    private beforeInsert;
}
/**
 * @schema SalesChannel
 * title: "Sales Channel"
 * description: "A Sales Channel"
 * type: object
 * required:
 *   - name
 * properties:
 *  id:
 *    type: string
 *    description: The sales channel's ID
 *    example: sc_01G8X9A7ESKAJXG2H0E6F1MW7A
 *  name:
 *    description: "The name of the sales channel."
 *    type: string
 *    example: Market
 *  description:
 *    description: "The description of the sales channel."
 *    type: string
 *    example: Multi-vendor market
 *  is_disabled:
 *    description: "Specify if the sales channel is enabled or disabled."
 *    type: boolean
 *    default: false
 *  created_at:
 *    type: string
 *    description: "The date with timezone at which the resource was created."
 *    format: date-time
 *  updated_at:
 *    type: string
 *    description: "The date with timezone at which the resource was updated."
 *    format: date-time
 *  deleted_at:
 *    type: string
 *    description: "The date with timezone at which the resource was deleted."
 *    format: date-time
 */
