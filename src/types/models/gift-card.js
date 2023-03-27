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
exports.GiftCard = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var order_1 = require("./order");
var region_1 = require("./region");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var GiftCard = /** @class */ (function (_super) {
    __extends(GiftCard, _super);
    function GiftCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GiftCard.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "gift");
    };
    __decorate([
        (0, typeorm_1.Index)({ unique: true }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], GiftCard.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], GiftCard.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], GiftCard.prototype, "balance", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], GiftCard.prototype, "region_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return region_1.Region; }),
        (0, typeorm_1.JoinColumn)({ name: "region_id" }),
        __metadata("design:type", region_1.Region)
    ], GiftCard.prototype, "region", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], GiftCard.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], GiftCard.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], GiftCard.prototype, "is_disabled", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: (0, db_aware_column_1.resolveDbType)("timestamptz"),
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], GiftCard.prototype, "ends_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "real", nullable: true }),
        __metadata("design:type", Object)
    ], GiftCard.prototype, "tax_rate", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], GiftCard.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GiftCard.prototype, "beforeInsert", null);
    GiftCard = __decorate([
        (0, typeorm_1.Entity)()
    ], GiftCard);
    return GiftCard;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.GiftCard = GiftCard;
/**
 * @schema GiftCard
 * title: "Gift Card"
 * description: "Gift Cards are redeemable and represent a value that can be used towards the payment of an Order."
 * type: object
 * required:
 *   - code
 *   - value
 *   - balance
 *   - region_id
 * properties:
 *   id:
 *     type: string
 *     description: The cart's ID
 *     example: gift_01G8XKBPBQY2R7RBET4J7E0XQZ
 *   code:
 *     description: "The unique code that identifies the Gift Card. This is used by the Customer to redeem the value of the Gift Card."
 *     type: string
 *     example: 3RFT-MH2C-Y4YZ-XMN4
 *   value:
 *     description: "The value that the Gift Card represents."
 *     type: integer
 *     example: 10
 *   balance:
 *     description: "The remaining value on the Gift Card."
 *     type: integer
 *     example: 10
 *   region_id:
 *     type: string
 *     description: "The id of the Region in which the Gift Card is available."
 *     example: reg_01G1G5V26T9H8Y0M4JNE3YGA4G
 *   region:
 *     description: A region object. Available if the relation `region` is expanded.
 *     type: object
 *   order_id:
 *     type: string
 *     description: "The id of the Order that the Gift Card was purchased in."
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   is_disabled:
 *     description: "Whether the Gift Card has been disabled. Disabled Gift Cards cannot be applied to carts."
 *     type: boolean
 *     example: false
 *   ends_at:
 *     description: "The time at which the Gift Card can no longer be used."
 *     type: string
 *     format: date-time
 *   tax_rate:
 *     description: The gift cards's tax rate that will be applied on calculating totals
 *     type: number
 *     example: 0
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
//# sourceMappingURL=gift-card.js.map