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
exports.ClaimOrder = exports.ClaimFulfillmentStatus = exports.ClaimPaymentStatus = exports.ClaimType = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var address_1 = require("./address");
var claim_item_1 = require("./claim-item");
var fulfillment_1 = require("./fulfillment");
var line_item_1 = require("./line-item");
var order_1 = require("./order");
var return_1 = require("./return");
var shipping_method_1 = require("./shipping-method");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var ClaimType;
(function (ClaimType) {
    ClaimType["REFUND"] = "refund";
    ClaimType["REPLACE"] = "replace";
})(ClaimType = exports.ClaimType || (exports.ClaimType = {}));
var ClaimPaymentStatus;
(function (ClaimPaymentStatus) {
    ClaimPaymentStatus["NA"] = "na";
    ClaimPaymentStatus["NOT_REFUNDED"] = "not_refunded";
    ClaimPaymentStatus["REFUNDED"] = "refunded";
})(ClaimPaymentStatus = exports.ClaimPaymentStatus || (exports.ClaimPaymentStatus = {}));
var ClaimFulfillmentStatus;
(function (ClaimFulfillmentStatus) {
    ClaimFulfillmentStatus["NOT_FULFILLED"] = "not_fulfilled";
    ClaimFulfillmentStatus["PARTIALLY_FULFILLED"] = "partially_fulfilled";
    ClaimFulfillmentStatus["FULFILLED"] = "fulfilled";
    ClaimFulfillmentStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    ClaimFulfillmentStatus["SHIPPED"] = "shipped";
    ClaimFulfillmentStatus["PARTIALLY_RETURNED"] = "partially_returned";
    ClaimFulfillmentStatus["RETURNED"] = "returned";
    ClaimFulfillmentStatus["CANCELED"] = "canceled";
    ClaimFulfillmentStatus["REQUIRES_ACTION"] = "requires_action";
})(ClaimFulfillmentStatus = exports.ClaimFulfillmentStatus || (exports.ClaimFulfillmentStatus = {}));
var ClaimOrder = /** @class */ (function (_super) {
    __extends(ClaimOrder, _super);
    function ClaimOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClaimOrder.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "claim");
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: ClaimPaymentStatus,
            default: ClaimPaymentStatus.NA,
        }),
        __metadata("design:type", String)
    ], ClaimOrder.prototype, "payment_status", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: ClaimFulfillmentStatus,
            default: ClaimFulfillmentStatus.NOT_FULFILLED,
        }),
        __metadata("design:type", String)
    ], ClaimOrder.prototype, "fulfillment_status", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return claim_item_1.ClaimItem; }, function (ci) { return ci.claim_order; }),
        __metadata("design:type", Array)
    ], ClaimOrder.prototype, "claim_items", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return line_item_1.LineItem; }, function (li) { return li.claim_order; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], ClaimOrder.prototype, "additional_items", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "enum", enum: ClaimType }),
        __metadata("design:type", String)
    ], ClaimOrder.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ClaimOrder.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (o) { return o.claims; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], ClaimOrder.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return return_1.Return; }, function (ret) { return ret.claim_order; }),
        __metadata("design:type", return_1.Return)
    ], ClaimOrder.prototype, "return_order", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ClaimOrder.prototype, "shipping_address_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return address_1.Address; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinColumn)({ name: "shipping_address_id" }),
        __metadata("design:type", address_1.Address)
    ], ClaimOrder.prototype, "shipping_address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return shipping_method_1.ShippingMethod; }, function (method) { return method.claim_order; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], ClaimOrder.prototype, "shipping_methods", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return fulfillment_1.Fulfillment; }, function (fulfillment) { return fulfillment.claim_order; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], ClaimOrder.prototype, "fulfillments", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ClaimOrder.prototype, "refund_amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], ClaimOrder.prototype, "canceled_at", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], ClaimOrder.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], ClaimOrder.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], ClaimOrder.prototype, "deleted_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], ClaimOrder.prototype, "no_notification", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ClaimOrder.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ClaimOrder.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ClaimOrder.prototype, "beforeInsert", null);
    ClaimOrder = __decorate([
        (0, typeorm_1.Entity)()
    ], ClaimOrder);
    return ClaimOrder;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.ClaimOrder = ClaimOrder;
/**
 * @schema ClaimOrder
 * title: "Claim Order"
 * description: "Claim Orders represent a group of faulty or missing items. Each claim order consists of a subset of items associated with an original order, and can contain additional information about fulfillments and returns."
 * type: object
 * required:
 *   - type
 *   - order_id
 * properties:
 *   id:
 *     type: string
 *     description: The claim's ID
 *     example: claim_01G8ZH853Y6TFXWPG5EYE81X63
 *   type:
 *     type: string
 *     enum:
 *       - refund
 *       - replace
 *   payment_status:
 *     type: string
 *     description: The status of the claim's payment
 *     enum:
 *       - na
 *       - not_refunded
 *       - refunded
 *     default: na
 *   fulfillment_status:
 *     type: string
 *     enum:
 *       - not_fulfilled
 *       - partially_fulfilled
 *       - fulfilled
 *       - partially_shipped
 *       - shipped
 *       - partially_returned
 *       - returned
 *       - canceled
 *       - requires_action
 *     default: not_fulfilled
 *   claim_items:
 *     description: "The items that have been claimed"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ClaimItem"
 *   additional_items:
 *     description: "Refers to the new items to be shipped when the claim order has the type `replace`"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/LineItem"
 *   order_id:
 *     description: "The ID of the order that the claim comes from."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   return_order:
 *     description: "A return object. Holds information about the return if the claim is to be returned. Available if the relation 'return_order' is expanded"
 *     type: object
 *   shipping_address_id:
 *     description: "The ID of the address that the new items should be shipped to"
 *     type: string
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   shipping_address:
 *     description: Available if the relation `shipping_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   shipping_methods:
 *     description: "The shipping methods that the claim order will be shipped with."
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ShippingMethod"
 *   fulfillments:
 *     description: "The fulfillments of the new items to be shipped"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Fulfillment"
 *   refund_amount:
 *     description: "The amount that will be refunded in conjunction with the claim"
 *     type: integer
 *     example: 1000
 *   canceled_at:
 *     description: "The date with timezone at which the claim was canceled."
 *     type: string
 *     format: date-time
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
 *   no_notification:
 *     description: "Flag for describing whether or not notifications related to this should be send."
 *     type: boolean
 *     example: false
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the cart associated with the claim in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 */
//# sourceMappingURL=claim-order.js.map