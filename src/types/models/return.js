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
exports.Return = exports.ReturnStatus = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var base_entity_1 = require("../interfaces/models/base-entity");
var claim_order_1 = require("./claim-order");
var order_1 = require("./order");
var return_item_1 = require("./return-item");
var shipping_method_1 = require("./shipping-method");
var swap_1 = require("./swap");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var ReturnStatus;
(function (ReturnStatus) {
    ReturnStatus["REQUESTED"] = "requested";
    ReturnStatus["RECEIVED"] = "received";
    ReturnStatus["REQUIRES_ACTION"] = "requires_action";
    ReturnStatus["CANCELED"] = "canceled";
})(ReturnStatus = exports.ReturnStatus || (exports.ReturnStatus = {}));
var Return = /** @class */ (function (_super) {
    __extends(Return, _super);
    function Return() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Return.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "ret");
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: ReturnStatus,
            default: ReturnStatus.REQUESTED,
        }),
        __metadata("design:type", String)
    ], Return.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return return_item_1.ReturnItem; }, function (item) { return item.return_order; }, {
            eager: true,
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Return.prototype, "items", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Return.prototype, "swap_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return swap_1.Swap; }, function (swap) { return swap.return_order; }),
        (0, typeorm_1.JoinColumn)({ name: "swap_id" }),
        __metadata("design:type", swap_1.Swap)
    ], Return.prototype, "swap", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Return.prototype, "claim_order_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return claim_order_1.ClaimOrder; }, function (co) { return co.return_order; }),
        (0, typeorm_1.JoinColumn)({ name: "claim_order_id" }),
        __metadata("design:type", claim_order_1.ClaimOrder)
    ], Return.prototype, "claim_order", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Return.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (o) { return o.returns; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], Return.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return shipping_method_1.ShippingMethod; }, function (method) { return method.return_order; }, {
            cascade: true,
        }),
        __metadata("design:type", shipping_method_1.ShippingMethod)
    ], Return.prototype, "shipping_method", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Return.prototype, "location_id", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Return.prototype, "shipping_data", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], Return.prototype, "refund_amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], Return.prototype, "received_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Object)
    ], Return.prototype, "no_notification", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Return.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Return.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Return.prototype, "beforeInsert", null);
    Return = __decorate([
        (0, typeorm_1.Entity)()
    ], Return);
    return Return;
}(base_entity_1.BaseEntity));
exports.Return = Return;
/**
 * @schema Return
 * title: "Return"
 * description: "Return orders hold information about Line Items that a Customer wishes to send back, along with how the items will be returned. Returns can be used as part of a Swap."
 * type: object
 * required:
 *   - refund_amount
 * properties:
 *   id:
 *     type: string
 *     description: The return's ID
 *     example: ret_01F0YET7XPCMF8RZ0Y151NZV2V
 *   status:
 *     description: "Status of the Return."
 *     type: string
 *     enum:
 *       - requested
 *       - received
 *       - requires_action
 *       - canceled
 *     default: requested
 *   items:
 *     description: The Return Items that will be shipped back to the warehouse. Available if the relation `items` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ReturnItem"
 *   swap_id:
 *     description: "The ID of the Swap that the Return is a part of."
 *     type: string
 *     example: null
 *   swap:
 *     description: A swap object. Available if the relation `swap` is expanded.
 *     type: object
 *   order_id:
 *     description: "The ID of the Order that the Return is made from."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   claim_order_id:
 *     description: "The ID of the Claim that the Return is a part of."
 *     type: string
 *     example: null
 *   claim_order:
 *     description: A claim order object. Available if the relation `claim_order` is expanded.
 *     type: object
 *   shipping_method:
 *     description: The Shipping Method that will be used to send the Return back. Can be null if the Customer facilitates the return shipment themselves. Available if the relation `shipping_method` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ShippingMethod"
 *   shipping_data:
 *     description: "Data about the return shipment as provided by the Fulfilment Provider that handles the return shipment."
 *     type: object
 *     example: {}
 *   refund_amount:
 *     description: "The amount that should be refunded as a result of the return."
 *     type: integer
 *     example: 1000
 *   no_notification:
 *     description: "When set to true, no notification will be sent related to this return."
 *     type: boolean
 *     example: false
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the return in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 *   received_at:
 *     description: "The date with timezone at which the return was received."
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
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
//# sourceMappingURL=return.js.map