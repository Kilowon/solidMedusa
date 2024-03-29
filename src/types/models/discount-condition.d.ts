import { CustomerGroup } from "./customer-group";
import { DiscountRule } from "./discount-rule";
import { Product } from "./product";
import { ProductCollection } from "./product-collection";
import { ProductTag } from "./product-tag";
import { ProductType } from "./product-type";
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity";
export declare enum DiscountConditionType {
    PRODUCTS = "products",
    PRODUCT_TYPES = "product_types",
    PRODUCT_COLLECTIONS = "product_collections",
    PRODUCT_TAGS = "product_tags",
    CUSTOMER_GROUPS = "customer_groups"
}
export declare enum DiscountConditionOperator {
    IN = "in",
    NOT_IN = "not_in"
}
export declare class DiscountCondition extends SoftDeletableEntity {
    type: DiscountConditionType;
    operator: DiscountConditionOperator;
    discount_rule_id: string;
    discount_rule: DiscountRule;
    products: Product[];
    product_types: ProductType[];
    product_tags: ProductTag[];
    product_collections: ProductCollection[];
    customer_groups: CustomerGroup[];
    metadata: Record<string, unknown>;
    private beforeInsert;
}
/**
 * @schema DiscountCondition
 * title: "Discount Condition"
 * description: "Holds rule conditions for when a discount is applicable"
 * type: object
 * required:
 *   - type
 *   - operator
 *   - discount_rule_id
 * properties:
 *   id:
 *     type: string
 *     description: The discount condition's ID
 *     example: discon_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   type:
 *     description: "The type of the Condition"
 *     type: string
 *     enum:
 *       - products
 *       - product_types
 *       - product_collections
 *       - product_tags
 *       - customer_groups
 *   operator:
 *     description: "The operator of the Condition"
 *     type: string
 *     enum:
 *       - in
 *       - not_in
 *   discount_rule_id:
 *     type: string
 *     description: The ID of the discount rule associated with the condition
 *     example: dru_01F0YESMVK96HVX7N419E3CJ7C
 *   discount_rule:
 *     description: Available if the relation `discount_rule` is expanded.
 *     $ref: "#/components/schemas/DiscountRule"
 *   products:
 *     description: products associated with this condition if type = products. Available if the relation `products` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: A product object.
 *   product_types:
 *     description: product types associated with this condition if type = product_types. Available if the relation `product_types` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: A product type object.
 *   product_tags:
 *     description: product tags associated with this condition if type = product_tags. Available if the relation `product_tags` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: A product tag object.
 *   product_collections:
 *     description: product collections associated with this condition if type = product_collections. Available if the relation `product_collections` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: A product collection object.
 *   customer_groups:
 *     description: customer groups associated with this condition if type = customer_groups. Available if the relation `customer_groups` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: A customer group object.
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
