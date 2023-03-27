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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingMethod = void 0;
var typeorm_1 = require("typeorm");
var cart_1 = require("./cart");
var claim_order_1 = require("./claim-order");
var db_aware_column_1 = require("../utils/db-aware-column");
var order_1 = require("./order");
var return_1 = require("./return");
var shipping_method_tax_line_1 = require("./shipping-method-tax-line");
var shipping_option_1 = require("./shipping-option");
var swap_1 = require("./swap");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var tax_inclusive_pricing_1 = __importDefault(require("../loaders/feature-flags/tax-inclusive-pricing"));
var ShippingMethod = /** @class */ (function () {
    function ShippingMethod() {
    }
    ShippingMethod.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "sm");
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], ShippingMethod.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ShippingMethod.prototype, "shipping_option_id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ShippingMethod.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], ShippingMethod.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], ShippingMethod.prototype, "claim_order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return claim_order_1.ClaimOrder; }),
        (0, typeorm_1.JoinColumn)({ name: "claim_order_id" }),
        __metadata("design:type", claim_order_1.ClaimOrder)
    ], ShippingMethod.prototype, "claim_order", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ShippingMethod.prototype, "cart_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cart_1.Cart; }),
        (0, typeorm_1.JoinColumn)({ name: "cart_id" }),
        __metadata("design:type", cart_1.Cart)
    ], ShippingMethod.prototype, "cart", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ShippingMethod.prototype, "swap_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return swap_1.Swap; }),
        (0, typeorm_1.JoinColumn)({ name: "swap_id" }),
        __metadata("design:type", swap_1.Swap)
    ], ShippingMethod.prototype, "swap", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ShippingMethod.prototype, "return_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return return_1.Return; }, function (ret) { return ret.shipping_method; }),
        (0, typeorm_1.JoinColumn)({ name: "return_id" }),
        __metadata("design:type", return_1.Return)
    ], ShippingMethod.prototype, "return_order", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return shipping_option_1.ShippingOption; }, { eager: true }),
        (0, typeorm_1.JoinColumn)({ name: "shipping_option_id" }),
        __metadata("design:type", shipping_option_1.ShippingOption)
    ], ShippingMethod.prototype, "shipping_option", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return shipping_method_tax_line_1.ShippingMethodTaxLine; }, function (tl) { return tl.shipping_method; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], ShippingMethod.prototype, "tax_lines", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], ShippingMethod.prototype, "price", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb" }),
        __metadata("design:type", Object)
    ], ShippingMethod.prototype, "data", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)(tax_inclusive_pricing_1.default.key, { default: false }),
        __metadata("design:type", Boolean)
    ], ShippingMethod.prototype, "includes_tax", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ShippingMethod.prototype, "beforeInsert", null);
    ShippingMethod = __decorate([
        (0, typeorm_1.Check)("\"claim_order_id\" IS NOT NULL OR \"order_id\" IS NOT NULL OR \"cart_id\" IS NOT NULL OR \"swap_id\" IS NOT NULL OR \"return_id\" IS NOT NULL"),
        (0, typeorm_1.Check)("\"price\" >= 0"),
        (0, typeorm_1.Entity)()
    ], ShippingMethod);
    return ShippingMethod;
}());
exports.ShippingMethod = ShippingMethod;
/**
 * @schema ShippingMethod
 * title: "Shipping Method"
 * description: "Shipping Methods represent a way in which an Order or Return can be shipped. Shipping Methods are built from a Shipping Option, but may contain additional details, that can be necessary for the Fulfillment Provider to handle the shipment."
 * type: object
 * required:
 *   - shipping_option_id
 *   - price
 * properties:
 *   id:
 *     type: string
 *     description: The shipping method's ID
 *     example: sm_01F0YET7DR2E7CYVSDHM593QG2
 *   shipping_option_id:
 *     description: "The id of the Shipping Option that the Shipping Method is built from."
 *     type: string
 *     example: so_01G1G5V27GYX4QXNARRQCW1N8T
 *   shipping_option:
 *     description: Available if the relation `shipping_option` is expanded.
 *     $ref: "#/components/schemas/ShippingOption"
 *   order_id:
 *     description: "The id of the Order that the Shipping Method is used on."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   return_id:
 *     description: "The id of the Return that the Shipping Method is used on."
 *     type: string
 *     example: null
 *   return_order:
 *     description: A return object. Available if the relation `return_order` is expanded.
 *     type: object
 *   swap_id:
 *     description: "The id of the Swap that the Shipping Method is used on."
 *     type: string
 *     example: null
 *   swap:
 *     description: A swap object. Available if the relation `swap` is expanded.
 *     type: object
 *   cart_id:
 *     description: "The id of the Cart that the Shipping Method is used on."
 *     type: string
 *     example: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   cart:
 *     description: A cart object. Available if the relation `cart` is expanded.
 *     type: object
 *   claim_order_id:
 *     description: "The id of the Claim that the Shipping Method is used on."
 *     type: string
 *     example: null
 *   claim_order:
 *     description: A claim order object. Available if the relation `claim_order` is expanded.
 *     type: object
 *   tax_lines:
 *     type: array
 *     description: Available if the relation `tax_lines` is expanded.
 *     items:
 *       $ref: "#/components/schemas/ShippingMethodTaxLine"
 *   price:
 *     description: "The amount to charge for the Shipping Method. The currency of the price is defined by the Region that the Order that the Shipping Method belongs to is a part of."
 *     type: integer
 *     example: 200
 *   data:
 *     description: "Additional data that the Fulfillment Provider needs to fulfill the shipment. This is used in combination with the Shipping Options data, and may contain information such as a drop point id."
 *     type: object
 *     example: {}
 *   includes_tax:
 *     description: "[EXPERIMENTAL] Indicates if the shipping method price include tax"
 *     type: boolean
 */
//# sourceMappingURL=shipping-method.js.map