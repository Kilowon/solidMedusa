"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountCondition = exports.DiscountConditionOperator = exports.DiscountConditionType = void 0;
var typeorm_1 = require("typeorm");
var customer_group_1 = require("./customer-group");
var db_aware_column_1 = require("../utils/db-aware-column");
var discount_rule_1 = require("./discount-rule");
var product_1 = require("./product");
var product_collection_1 = require("./product-collection");
var product_tag_1 = require("./product-tag");
var product_type_1 = require("./product-type");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var DiscountConditionType;
(function (DiscountConditionType) {
    DiscountConditionType["PRODUCTS"] = "products";
    DiscountConditionType["PRODUCT_TYPES"] = "product_types";
    DiscountConditionType["PRODUCT_COLLECTIONS"] = "product_collections";
    DiscountConditionType["PRODUCT_TAGS"] = "product_tags";
    DiscountConditionType["CUSTOMER_GROUPS"] = "customer_groups";
})(DiscountConditionType = exports.DiscountConditionType || (exports.DiscountConditionType = {}));
var DiscountConditionOperator;
(function (DiscountConditionOperator) {
    DiscountConditionOperator["IN"] = "in";
    DiscountConditionOperator["NOT_IN"] = "not_in";
})(DiscountConditionOperator = exports.DiscountConditionOperator || (exports.DiscountConditionOperator = {}));
var DiscountCondition = /** @class */ (function (_super) {
    __extends(DiscountCondition, _super);
    function DiscountCondition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiscountCondition.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "discon");
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: DiscountConditionType,
        }),
        __metadata("design:type", String)
    ], DiscountCondition.prototype, "type", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: DiscountConditionOperator,
        }),
        __metadata("design:type", String)
    ], DiscountCondition.prototype, "operator", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], DiscountCondition.prototype, "discount_rule_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return discount_rule_1.DiscountRule; }, function (dr) { return dr.conditions; }),
        (0, typeorm_1.JoinColumn)({ name: "discount_rule_id" }),
        __metadata("design:type", discount_rule_1.DiscountRule)
    ], DiscountCondition.prototype, "discount_rule", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return product_1.Product; }),
        (0, typeorm_1.JoinTable)({
            name: "discount_condition_product",
            joinColumn: {
                name: "condition_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "product_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], DiscountCondition.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return product_type_1.ProductType; }),
        (0, typeorm_1.JoinTable)({
            name: "discount_condition_product_type",
            joinColumn: {
                name: "condition_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "product_type_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], DiscountCondition.prototype, "product_types", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return product_tag_1.ProductTag; }),
        (0, typeorm_1.JoinTable)({
            name: "discount_condition_product_tag",
            joinColumn: {
                name: "condition_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "product_tag_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], DiscountCondition.prototype, "product_tags", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return product_collection_1.ProductCollection; }),
        (0, typeorm_1.JoinTable)({
            name: "discount_condition_product_collection",
            joinColumn: {
                name: "condition_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "product_collection_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], DiscountCondition.prototype, "product_collections", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return customer_group_1.CustomerGroup; }),
        (0, typeorm_1.JoinTable)({
            name: "discount_condition_customer_group",
            joinColumn: {
                name: "condition_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "customer_group_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], DiscountCondition.prototype, "customer_groups", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], DiscountCondition.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DiscountCondition.prototype, "beforeInsert", null);
    DiscountCondition = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)("dctypeuniq", ["type", "operator", "discount_rule_id"])
    ], DiscountCondition);
    return DiscountCondition;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.DiscountCondition = DiscountCondition;
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
//# sourceMappingURL=discount-condition.js.map