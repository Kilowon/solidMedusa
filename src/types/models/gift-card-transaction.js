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
exports.GiftCardTransaction = void 0;
var typeorm_1 = require("typeorm");
var gift_card_1 = require("./gift-card");
var order_1 = require("./order");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var db_aware_column_1 = require("../utils/db-aware-column");
var GiftCardTransaction = /** @class */ (function () {
    function GiftCardTransaction() {
    }
    GiftCardTransaction.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "gct");
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], GiftCardTransaction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], GiftCardTransaction.prototype, "gift_card_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return gift_card_1.GiftCard; }),
        (0, typeorm_1.JoinColumn)({ name: "gift_card_id" }),
        __metadata("design:type", gift_card_1.GiftCard)
    ], GiftCardTransaction.prototype, "gift_card", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], GiftCardTransaction.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], GiftCardTransaction.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], GiftCardTransaction.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], GiftCardTransaction.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Boolean)
    ], GiftCardTransaction.prototype, "is_taxable", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "real", nullable: true }),
        __metadata("design:type", Object)
    ], GiftCardTransaction.prototype, "tax_rate", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GiftCardTransaction.prototype, "beforeInsert", null);
    GiftCardTransaction = __decorate([
        (0, typeorm_1.Unique)("gcuniq", ["gift_card_id", "order_id"]),
        (0, typeorm_1.Entity)()
    ], GiftCardTransaction);
    return GiftCardTransaction;
}());
exports.GiftCardTransaction = GiftCardTransaction;
/**
 * @schema GiftCardTransaction
 * title: "Gift Card Transaction"
 * description: "Gift Card Transactions are created once a Customer uses a Gift Card to pay for their Order"
 * type: object
 * required:
 *   - gift_card_id
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The gift card transaction's ID
 *     example: gct_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   gift_card_id:
 *     description: "The ID of the Gift Card that was used in the transaction."
 *     type: string
 *     example: gift_01G8XKBPBQY2R7RBET4J7E0XQZ
 *   gift_card:
 *     description: A gift card object. Available if the relation `gift_card` is expanded.
 *     type: object
 *   order_id:
 *     description: "The ID of the Order that the Gift Card was used to pay for."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   amount:
 *     description: "The amount that was used from the Gift Card."
 *     type: integer
 *     example: 10
 *   created_at:
 *     description: "The date with timezone at which the resource was created."
 *     type: string
 *     format: date-time
 *   is_taxable:
 *     description: "Whether the transaction is taxable or not."
 *     type: boolean
 *     example: false
 *   tax_rate:
 *     description: "The tax rate of the transaction"
 *     type: number
 *     example: 0
 */
//# sourceMappingURL=gift-card-transaction.js.map