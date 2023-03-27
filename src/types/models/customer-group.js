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
exports.CustomerGroup = void 0;
var typeorm_1 = require("typeorm");
var customer_1 = require("./customer");
var db_aware_column_1 = require("../utils/db-aware-column");
var price_list_1 = require("./price-list");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var CustomerGroup = /** @class */ (function (_super) {
    __extends(CustomerGroup, _super);
    function CustomerGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerGroup.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "cgrp");
    };
    __decorate([
        (0, typeorm_1.Index)({ unique: true, where: "deleted_at IS NULL" }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], CustomerGroup.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return customer_1.Customer; }, function (customer) { return customer.groups; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], CustomerGroup.prototype, "customers", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return price_list_1.PriceList; }, function (priceList) { return priceList.customer_groups; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], CustomerGroup.prototype, "price_lists", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], CustomerGroup.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CustomerGroup.prototype, "beforeInsert", null);
    CustomerGroup = __decorate([
        (0, typeorm_1.Entity)()
    ], CustomerGroup);
    return CustomerGroup;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.CustomerGroup = CustomerGroup;
/**
 * @schema CustomerGroup
 * title: "Customer Group"
 * description: "Represents a customer group"
 * type: object
 * required:
 *   - name
 * properties:
 *   id:
 *     type: string
 *     description: The customer group's ID
 *     example: cgrp_01G8ZH853Y6TFXWPG5EYE81X63
 *   name:
 *     type: string
 *     description: The name of the customer group
 *     example: VIP
 *   customers:
 *     type: array
 *     description: The customers that belong to the customer group. Available if the relation `customers` is expanded.
 *     items:
 *       type: object
 *       description: A customer object.
 *   price_lists:
 *     type: array
 *     description: The price lists that are associated with the customer group. Available if the relation `price_lists` is expanded.
 *     items:
 *       $ref: "#/components/schemas/PriceList"
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
//# sourceMappingURL=customer-group.js.map