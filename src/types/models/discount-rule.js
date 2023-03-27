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
exports.DiscountRule = exports.AllocationType = exports.DiscountRuleType = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var discount_condition_1 = require("./discount-condition");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var DiscountRuleType;
(function (DiscountRuleType) {
    DiscountRuleType["FIXED"] = "fixed";
    DiscountRuleType["PERCENTAGE"] = "percentage";
    DiscountRuleType["FREE_SHIPPING"] = "free_shipping";
})(DiscountRuleType = exports.DiscountRuleType || (exports.DiscountRuleType = {}));
var AllocationType;
(function (AllocationType) {
    AllocationType["TOTAL"] = "total";
    AllocationType["ITEM"] = "item";
})(AllocationType = exports.AllocationType || (exports.AllocationType = {}));
var DiscountRule = /** @class */ (function (_super) {
    __extends(DiscountRule, _super);
    function DiscountRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiscountRule.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "dru");
    };
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], DiscountRule.prototype, "description", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: DiscountRuleType,
        }),
        __metadata("design:type", String)
    ], DiscountRule.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], DiscountRule.prototype, "value", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: AllocationType,
            nullable: true,
        }),
        __metadata("design:type", String)
    ], DiscountRule.prototype, "allocation", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return discount_condition_1.DiscountCondition; }, function (conditions) { return conditions.discount_rule; }),
        __metadata("design:type", Array)
    ], DiscountRule.prototype, "conditions", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], DiscountRule.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DiscountRule.prototype, "beforeInsert", null);
    DiscountRule = __decorate([
        (0, typeorm_1.Entity)()
    ], DiscountRule);
    return DiscountRule;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.DiscountRule = DiscountRule;
/**
 * @schema DiscountRule
 * title: "Discount Rule"
 * description: "Holds the rules that governs how a Discount is calculated when applied to a Cart."
 * type: object
 * required:
 *   - type
 *   - value
 * properties:
 *   id:
 *     type: string
 *     description: The discount rule's ID
 *     example: dru_01F0YESMVK96HVX7N419E3CJ7C
 *   type:
 *     description: "The type of the Discount, can be `fixed` for discounts that reduce the price by a fixed amount, `percentage` for percentage reductions or `free_shipping` for shipping vouchers."
 *     type: string
 *     enum:
 *       - fixed
 *       - percentage
 *       - free_shipping
 *     example: percentage
 *   description:
 *     description: "A short description of the discount"
 *     type: string
 *     example: 10 Percent
 *   value:
 *     description: "The value that the discount represents; this will depend on the type of the discount"
 *     type: integer
 *     example: 10
 *   allocation:
 *     description: "The scope that the discount should apply to."
 *     type: string
 *     enum:
 *       - total
 *       - item
 *     example: total
 *   conditions:
 *     description: A set of conditions that can be used to limit when  the discount can be used. Available if the relation `conditions` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: A discount condition object.
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
//# sourceMappingURL=discount-rule.js.map