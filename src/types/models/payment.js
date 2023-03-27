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
exports.Payment = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var base_entity_1 = require("../interfaces/models/base-entity");
var cart_1 = require("./cart");
var currency_1 = require("./currency");
var order_1 = require("./order");
var swap_1 = require("./swap");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Payment.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "pay");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Payment.prototype, "swap_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return swap_1.Swap; }),
        (0, typeorm_1.JoinColumn)({ name: "swap_id" }),
        __metadata("design:type", swap_1.Swap)
    ], Payment.prototype, "swap", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Payment.prototype, "cart_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cart_1.Cart; }),
        (0, typeorm_1.JoinColumn)({ name: "cart_id" }),
        __metadata("design:type", cart_1.Cart)
    ], Payment.prototype, "cart", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Payment.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (order) { return order.payments; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], Payment.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], Payment.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Payment.prototype, "currency_code", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return currency_1.Currency; }),
        (0, typeorm_1.JoinColumn)({ name: "currency_code", referencedColumnName: "code" }),
        __metadata("design:type", currency_1.Currency)
    ], Payment.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 0 }),
        __metadata("design:type", Number)
    ], Payment.prototype, "amount_refunded", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Payment.prototype, "provider_id", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb" }),
        __metadata("design:type", Object)
    ], Payment.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Object)
    ], Payment.prototype, "captured_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Object)
    ], Payment.prototype, "canceled_at", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Payment.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Payment.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Payment.prototype, "beforeInsert", null);
    Payment = __decorate([
        (0, typeorm_1.Index)(["cart_id"], { where: "canceled_at IS NOT NULL" }),
        (0, typeorm_1.Index)("UniquePaymentActive", ["cart_id"], {
            where: "canceled_at IS NULL",
            unique: true,
        }),
        (0, typeorm_1.Entity)()
    ], Payment);
    return Payment;
}(base_entity_1.BaseEntity));
exports.Payment = Payment;
/**
 * @schema Payment
 * title: "Payment"
 * description: "Payments represent an amount authorized with a given payment method, Payments can be captured, canceled or refunded."
 * type: object
 * required:
 *   - amount
 *   - currency_code
 *   - provider_id
 * properties:
 *   id:
 *     type: string
 *     description: The payment's ID
 *     example: pay_01G2SJNT6DEEWDFNAJ4XWDTHKE
 *   swap_id:
 *     description: "The ID of the Swap that the Payment is used for."
 *     type: string
 *     example: null
 *   swap:
 *     description: A swap object. Available if the relation `swap` is expanded.
 *     type: object
 *   cart_id:
 *     description: "The id of the Cart that the Payment Session is created for."
 *     type: string
 *   cart:
 *     description: A cart object. Available if the relation `cart` is expanded.
 *     type: object
 *   order_id:
 *     description: "The ID of the Order that the Payment is used for."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   amount:
 *     description: "The amount that the Payment has been authorized for."
 *     type: integer
 *     example: 100
 *   currency_code:
 *     description: "The 3 character ISO currency code that the Payment is completed in."
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   currency:
 *     description: Available if the relation `currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   amount_refunded:
 *     description: "The amount of the original Payment amount that has been refunded back to the Customer."
 *     type: integer
 *     example: 0
 *   provider_id:
 *     description: "The id of the Payment Provider that is responsible for the Payment"
 *     type: string
 *     example: manual
 *   data:
 *     description: "The data required for the Payment Provider to identify, modify and process the Payment. Typically this will be an object that holds an id to the external payment session, but can be an empty object if the Payment Provider doesn't hold any state."
 *     type: object
 *     example: {}
 *   captured_at:
 *     description: "The date with timezone at which the Payment was captured."
 *     type: string
 *     format: date-time
 *   canceled_at:
 *     description: "The date with timezone at which the Payment was canceled."
 *     type: string
 *     format: date-time
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of a payment in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
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
//# sourceMappingURL=payment.js.map