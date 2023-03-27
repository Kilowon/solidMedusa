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
exports.Fulfillment = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var base_entity_1 = require("../interfaces/models/base-entity");
var claim_order_1 = require("./claim-order");
var fulfillment_item_1 = require("./fulfillment-item");
var fulfillment_provider_1 = require("./fulfillment-provider");
var order_1 = require("./order");
var swap_1 = require("./swap");
var tracking_link_1 = require("./tracking-link");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var Fulfillment = /** @class */ (function (_super) {
    __extends(Fulfillment, _super);
    function Fulfillment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fulfillment.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "ful");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Fulfillment.prototype, "claim_order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return claim_order_1.ClaimOrder; }, function (co) { return co.fulfillments; }),
        (0, typeorm_1.JoinColumn)({ name: "claim_order_id" }),
        __metadata("design:type", claim_order_1.ClaimOrder)
    ], Fulfillment.prototype, "claim_order", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Fulfillment.prototype, "swap_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return swap_1.Swap; }, function (swap) { return swap.fulfillments; }),
        (0, typeorm_1.JoinColumn)({ name: "swap_id" }),
        __metadata("design:type", swap_1.Swap)
    ], Fulfillment.prototype, "swap", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Fulfillment.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (o) { return o.fulfillments; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], Fulfillment.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], Fulfillment.prototype, "no_notification", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Fulfillment.prototype, "provider_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Fulfillment.prototype, "location_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return fulfillment_provider_1.FulfillmentProvider; }),
        (0, typeorm_1.JoinColumn)({ name: "provider_id" }),
        __metadata("design:type", fulfillment_provider_1.FulfillmentProvider)
    ], Fulfillment.prototype, "provider", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return fulfillment_item_1.FulfillmentItem; }, function (i) { return i.fulfillment; }, {
            eager: true,
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], Fulfillment.prototype, "items", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return tracking_link_1.TrackingLink; }, function (tl) { return tl.fulfillment; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Fulfillment.prototype, "tracking_links", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", default: [] }),
        __metadata("design:type", Array)
    ], Fulfillment.prototype, "tracking_numbers", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb" }),
        __metadata("design:type", Object)
    ], Fulfillment.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], Fulfillment.prototype, "shipped_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], Fulfillment.prototype, "canceled_at", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Fulfillment.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Fulfillment.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Fulfillment.prototype, "beforeInsert", null);
    Fulfillment = __decorate([
        (0, typeorm_1.Entity)()
    ], Fulfillment);
    return Fulfillment;
}(base_entity_1.BaseEntity));
exports.Fulfillment = Fulfillment;
/**
 * @schema Fulfillment
 * title: "Fulfillment"
 * description: "Fulfillments are created once store operators can prepare the purchased goods. Fulfillments will eventually be shipped and hold information about how to track shipments. Fulfillments are created through a provider, which is typically an external shipping aggregator, shipping partner og 3PL, most plugins will have asynchronous communications with these providers through webhooks in order to automatically update and synchronize the state of Fulfillments."
 * type: object
 * required:
 *  - provider_id
 * properties:
 *   id:
 *     type: string
 *     description: The cart's ID
 *     example: ful_01G8ZRTMQCA76TXNAT81KPJZRF
 *   claim_order_id:
 *     description: "The id of the Claim that the Fulfillment belongs to."
 *     type: string
 *     example: null
 *   claim_order:
 *     description: A claim order object. Available if the relation `claim_order` is expanded.
 *     type: object
 *   swap_id:
 *     description: "The id of the Swap that the Fulfillment belongs to."
 *     type: string
 *     example: null
 *   swap:
 *     description: A swap object. Available if the relation `swap` is expanded.
 *     type: object
 *   order_id:
 *     description: "The id of the Order that the Fulfillment belongs to."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   provider_id:
 *     description: "The id of the Fulfillment Provider responsible for handling the fulfillment"
 *     type: string
 *     example: manual
 *   location_id:
 *     description: "The id of the stock location the fulfillment will be shipped from"
 *     type: string
 *     example: sloc_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   provider:
 *     description: Available if the relation `provider` is expanded.
 *     $ref: "#/components/schemas/FulfillmentProvider"
 *   items:
 *     description: The Fulfillment Items in the Fulfillment - these hold information about how many of each Line Item has been fulfilled. Available if the relation `items` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/FulfillmentItem"
 *   tracking_links:
 *     description: The Tracking Links that can be used to track the status of the Fulfillment, these will usually be provided by the Fulfillment Provider. Available if the relation `tracking_links` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/TrackingLink"
 *   tracking_numbers:
 *     deprecated: true
 *     description: The tracking numbers that can be used to track the status of the fulfillment.
 *     type: array
 *     items:
 *       type: string
 *   data:
 *     description: This contains all the data necessary for the Fulfillment provider to handle the fulfillment.
 *     type: object
 *     example: {}
 *   shipped_at:
 *     description: "The date with timezone at which the Fulfillment was shipped."
 *     type: string
 *     format: date-time
 *   no_notification:
 *     description: "Flag for describing whether or not notifications related to this should be send."
 *     type: boolean
 *     example: false
 *   canceled_at:
 *     description: "The date with timezone at which the Fulfillment was canceled."
 *     type: string
 *     format: date-time
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the fulfillment in case of failure.
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
 *   deleted_at:
 *     type: string
 *     description: "The date with timezone at which the resource was deleted."
 *     format: date-time
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
//# sourceMappingURL=fulfillment.js.map