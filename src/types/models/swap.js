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
exports.Swap = exports.SwapPaymentStatus = exports.SwapFulfillmentStatus = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var address_1 = require("./address");
var cart_1 = require("./cart");
var fulfillment_1 = require("./fulfillment");
var line_item_1 = require("./line-item");
var order_1 = require("./order");
var payment_1 = require("./payment");
var return_1 = require("./return");
var shipping_method_1 = require("./shipping-method");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var SwapFulfillmentStatus;
(function (SwapFulfillmentStatus) {
    SwapFulfillmentStatus["NOT_FULFILLED"] = "not_fulfilled";
    SwapFulfillmentStatus["FULFILLED"] = "fulfilled";
    SwapFulfillmentStatus["SHIPPED"] = "shipped";
    SwapFulfillmentStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    SwapFulfillmentStatus["CANCELED"] = "canceled";
    SwapFulfillmentStatus["REQUIRES_ACTION"] = "requires_action";
})(SwapFulfillmentStatus = exports.SwapFulfillmentStatus || (exports.SwapFulfillmentStatus = {}));
var SwapPaymentStatus;
(function (SwapPaymentStatus) {
    SwapPaymentStatus["NOT_PAID"] = "not_paid";
    SwapPaymentStatus["AWAITING"] = "awaiting";
    SwapPaymentStatus["CAPTURED"] = "captured";
    SwapPaymentStatus["CONFIRMED"] = "confirmed";
    SwapPaymentStatus["CANCELED"] = "canceled";
    SwapPaymentStatus["DIFFERENCE_REFUNDED"] = "difference_refunded";
    SwapPaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
    SwapPaymentStatus["REFUNDED"] = "refunded";
    SwapPaymentStatus["REQUIRES_ACTION"] = "requires_action";
})(SwapPaymentStatus = exports.SwapPaymentStatus || (exports.SwapPaymentStatus = {}));
var Swap = /** @class */ (function (_super) {
    __extends(Swap, _super);
    function Swap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Swap.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "swap");
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "enum", enum: SwapFulfillmentStatus }),
        __metadata("design:type", String)
    ], Swap.prototype, "fulfillment_status", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "enum", enum: SwapPaymentStatus }),
        __metadata("design:type", String)
    ], Swap.prototype, "payment_status", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ type: "string" }),
        __metadata("design:type", String)
    ], Swap.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (o) { return o.swaps; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], Swap.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return line_item_1.LineItem; }, function (item) { return item.swap; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], Swap.prototype, "additional_items", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return return_1.Return; }, function (ret) { return ret.swap; }, { cascade: ["insert"] }),
        __metadata("design:type", return_1.Return)
    ], Swap.prototype, "return_order", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return fulfillment_1.Fulfillment; }, function (fulfillment) { return fulfillment.swap; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Swap.prototype, "fulfillments", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return payment_1.Payment; }, function (p) { return p.swap; }, { cascade: ["insert"] }),
        __metadata("design:type", payment_1.Payment)
    ], Swap.prototype, "payment", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], Swap.prototype, "difference_due", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Swap.prototype, "shipping_address_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return address_1.Address; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinColumn)({ name: "shipping_address_id" }),
        __metadata("design:type", address_1.Address)
    ], Swap.prototype, "shipping_address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return shipping_method_1.ShippingMethod; }, function (method) { return method.swap; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Swap.prototype, "shipping_methods", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Swap.prototype, "cart_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return cart_1.Cart; }),
        (0, typeorm_1.JoinColumn)({ name: "cart_id" }),
        __metadata("design:type", cart_1.Cart)
    ], Swap.prototype, "cart", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], Swap.prototype, "confirmed_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], Swap.prototype, "canceled_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], Swap.prototype, "no_notification", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], Swap.prototype, "allow_backorder", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Swap.prototype, "idempotency_key", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Swap.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Swap.prototype, "beforeInsert", null);
    Swap = __decorate([
        (0, typeorm_1.Entity)()
    ], Swap);
    return Swap;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.Swap = Swap;
/**
 * @schema Swap
 * title: "Swap"
 * description: "Swaps can be created when a Customer wishes to exchange Products that they have purchased to different Products. Swaps consist of a Return of previously purchased Products and a Fulfillment of new Products, the amount paid for the Products being returned will be used towards payment for the new Products. In the case where the amount paid for the the Products being returned exceed the amount to be paid for the new Products, a Refund will be issued for the difference."
 * type: object
 * required:
 *   - fulfillment_status
 *   - payment_status
 *   - order_id
 * properties:
 *   id:
 *     type: string
 *     description: The swap's ID
 *     example: swap_01F0YET86Y9G92D3YDR9Y6V676
 *   fulfillment_status:
 *     description: "The status of the Fulfillment of the Swap."
 *     type: string
 *     enum:
 *       - not_fulfilled
 *       - fulfilled
 *       - shipped
 *       - canceled
 *       - requires_action
 *     example: not_fulfilled
 *   payment_status:
 *     description: "The status of the Payment of the Swap. The payment may either refer to the refund of an amount or the authorization of a new amount."
 *     type: string
 *     enum:
 *       - not_paid
 *       - awaiting
 *       - captured
 *       - confirmed
 *       - canceled
 *       - difference_refunded
 *       - partially_refunded
 *       - refunded
 *       - requires_action
 *     example: not_paid
 *   order_id:
 *     description: "The ID of the Order where the Line Items to be returned where purchased."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   additional_items:
 *     description: The new Line Items to ship to the Customer. Available if the relation `additional_items` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/LineItem"
 *   return_order:
 *     description: A return order object. The Return that is issued for the return part of the Swap. Available if the relation `return_order` is expanded.
 *     type: object
 *   fulfillments:
 *     description: The Fulfillments used to send the new Line Items. Available if the relation `fulfillments` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Fulfillment"
 *   payment:
 *     description: The Payment authorized when the Swap requires an additional amount to be charged from the Customer. Available if the relation `payment` is expanded.
 *     $ref: "#/components/schemas/Payment"
 *   difference_due:
 *     description: "The difference that is paid or refunded as a result of the Swap. May be negative when the amount paid for the returned items exceed the total of the new Products."
 *     type: integer
 *     example: 0
 *   shipping_address_id:
 *     description: The Address to send the new Line Items to - in most cases this will be the same as the shipping address on the Order.
 *     type: string
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   shipping_address:
 *     description: Available if the relation `shipping_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   shipping_methods:
 *     description: The Shipping Methods used to fulfill the additional items purchased. Available if the relation `shipping_methods` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ShippingMethod"
 *   cart_id:
 *     description: "The id of the Cart that the Customer will use to confirm the Swap."
 *     type: string
 *     example: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   cart:
 *     description: A cart object. Available if the relation `cart` is expanded.
 *     type: object
 *   allow_backorder:
 *     description: "If true, swaps can be completed with items out of stock"
 *     type: boolean
 *     default: false
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the swap in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 *   confirmed_at:
 *     description: "The date with timezone at which the Swap was confirmed by the Customer."
 *     type: string
 *     format: date-time
 *   canceled_at:
 *     description: "The date with timezone at which the Swap was canceled."
 *     type: string
 *     format: date-time
 *   no_notification:
 *     description: "If set to true, no notification will be sent related to this swap"
 *     type: boolean
 *     example: false
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
//# sourceMappingURL=swap.js.map