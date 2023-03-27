import { BaseEntity } from "../interfaces/models/base-entity";
export declare class TaxLine extends BaseEntity {
    rate: number;
    name: string;
    code: string | null;
    metadata: Record<string, unknown>;
}
/**
 * @schema TaxLine
 * title: "Tax Line"
 * description: "Line item that specifies an amount of tax to add to a line item."
 * type: object
 * required:
 *   - rate
 *   - name
 * properties:
 *   id:
 *     type: string
 *     description: The tax line's ID
 *     example: tl_01G1G5V2DRX1SK6NQQ8VVX4HQ8
 *   code:
 *     description: "A code to identify the tax type by"
 *     type: string
 *     example: tax01
 *   name:
 *     description: "A human friendly name for the tax"
 *     type: string
 *     example: Tax Example
 *   rate:
 *     description: "The numeric rate to charge tax by"
 *     type: number
 *     example: 10
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
