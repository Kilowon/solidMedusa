"use strict";
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
exports.LineItemAdjustment = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var discount_1 = require("./discount");
var line_item_1 = require("./line-item");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var LineItemAdjustment = /** @class */ (function () {
    function LineItemAdjustment() {
    }
    LineItemAdjustment.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "lia");
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], LineItemAdjustment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LineItemAdjustment.prototype, "item_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return line_item_1.LineItem; }, function (li) { return li.adjustments; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "item_id" }),
        __metadata("design:type", line_item_1.LineItem)
    ], LineItemAdjustment.prototype, "item", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LineItemAdjustment.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return discount_1.Discount; }),
        (0, typeorm_1.JoinColumn)({ name: "discount_id" }),
        __metadata("design:type", discount_1.Discount)
    ], LineItemAdjustment.prototype, "discount", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], LineItemAdjustment.prototype, "discount_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], LineItemAdjustment.prototype, "amount", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], LineItemAdjustment.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LineItemAdjustment.prototype, "beforeInsert", null);
    LineItemAdjustment = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Index)(["discount_id", "item_id"], {
            unique: true,
            where: "\"discount_id\" IS NOT NULL",
        })
    ], LineItemAdjustment);
    return LineItemAdjustment;
}());
exports.LineItemAdjustment = LineItemAdjustment;
/**
 * @schema LineItemAdjustment
 * title: "Line Item Adjustment"
 * description: "Represents a Line Item Adjustment"
 * type: object
 * required:
 *   - item_id
 *   - description
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The invite's ID
 *     example: lia_01G8TKE4XYCTHSCK2GDEP47RE1
 *   item_id:
 *     type: string
 *     description: The ID of the line item
 *     example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   item:
 *     description: Available if the relation `item` is expanded.
 *     $ref: "#/components/schemas/LineItem"
 *   description:
 *     type: string
 *     description: The line item's adjustment description
 *     example: Adjusted item's price.
 *   discount_id:
 *     type: string
 *     description: The ID of the discount associated with the adjustment
 *     example: disc_01F0YESMW10MGHWJKZSDDMN0VN
 *   discount:
 *     description: Available if the relation `discount` is expanded.
 *     $ref: "#/components/schemas/Discount"
 *   amount:
 *     type: number
 *     description: The adjustment amount
 *     example: 1000
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
//# sourceMappingURL=line-item-adjustment.js.map