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
exports.MoneyAmount = void 0;
var typeorm_1 = require("typeorm");
var currency_1 = require("./currency");
var price_list_1 = require("./price-list");
var product_variant_1 = require("./product-variant");
var region_1 = require("./region");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var MoneyAmount = /** @class */ (function (_super) {
    __extends(MoneyAmount, _super);
    function MoneyAmount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoneyAmount.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "ma");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], MoneyAmount.prototype, "currency_code", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return currency_1.Currency; }),
        (0, typeorm_1.JoinColumn)({ name: "currency_code", referencedColumnName: "code" }),
        __metadata("design:type", currency_1.Currency)
    ], MoneyAmount.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], MoneyAmount.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Object)
    ], MoneyAmount.prototype, "min_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Object)
    ], MoneyAmount.prototype, "max_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], MoneyAmount.prototype, "price_list_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return price_list_1.PriceList; }, function (priceList) { return priceList.prices; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "price_list_id" }),
        __metadata("design:type", Object)
    ], MoneyAmount.prototype, "price_list", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], MoneyAmount.prototype, "variant_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_variant_1.ProductVariant; }, function (variant) { return variant.prices; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "variant_id" }),
        __metadata("design:type", product_variant_1.ProductVariant)
    ], MoneyAmount.prototype, "variant", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], MoneyAmount.prototype, "region_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return region_1.Region; }),
        (0, typeorm_1.JoinColumn)({ name: "region_id" }),
        __metadata("design:type", region_1.Region)
    ], MoneyAmount.prototype, "region", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], MoneyAmount.prototype, "beforeInsert", null);
    MoneyAmount = __decorate([
        (0, typeorm_1.Entity)()
    ], MoneyAmount);
    return MoneyAmount;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.MoneyAmount = MoneyAmount;
/**
 * @schema MoneyAmount
 * title: "Money Amount"
 * description: "Money Amounts represents an amount that a given Product Variant can be purcased for. Each Money Amount either has a Currency or Region associated with it to indicate the pricing in a given Currency or, for fully region-based pricing, the given price in a specific Region. If region-based pricing is used the amount will be in the currency defined for the Reigon."
 * type: object
 * required:
 *   - currency_code
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The money amount's ID
 *     example: ma_01F0YESHRFQNH5S8Q0PK84YYZN
 *   currency_code:
 *     description: "The 3 character currency code that the Money Amount is given in."
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   currency:
 *     description: Available if the relation `currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   amount:
 *     description: "The amount in the smallest currecny unit (e.g. cents 100 cents to charge $1) that the Product Variant will cost."
 *     type: integer
 *     example: 100
 *   min_quantity:
 *     description: "The minimum quantity that the Money Amount applies to. If this value is not set, the Money Amount applies to all quantities."
 *     type: integer
 *     example: 1
 *   max_quantity:
 *     description: "The maximum quantity that the Money Amount applies to. If this value is not set, the Money Amount applies to all quantities."
 *     type: integer
 *     example: 1
 *   price_list_id:
 *     type: string
 *     description: The ID of the price list associated with the money amount
 *     example: pl_01G8X3CKJXCG5VXVZ87H9KC09W
 *   price_list:
 *     description: Available if the relation `price_list` is expanded.
 *     $ref: "#/components/schemas/PriceList"
 *   variant_id:
 *     description: "The id of the Product Variant contained in the Line Item."
 *     type: string
 *     example: variant_01G1G5V2MRX2V3PVSR2WXYPFB6
 *   variant:
 *     description: The Product Variant contained in the Line Item. Available if the relation `variant` is expanded.
 *     type: object
 *   region_id:
 *     type: string
 *     description: The region's ID
 *     example: reg_01G1G5V26T9H8Y0M4JNE3YGA4G
 *   region:
 *     description: A region object. Available if the relation `region` is expanded.
 *     type: object
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
//# sourceMappingURL=money-amount.js.map