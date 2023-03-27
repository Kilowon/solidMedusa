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
exports.TrackingLink = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var fulfillment_1 = require("./fulfillment");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var TrackingLink = /** @class */ (function (_super) {
    __extends(TrackingLink, _super);
    function TrackingLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrackingLink.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "tlink");
    };
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], TrackingLink.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], TrackingLink.prototype, "tracking_number", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], TrackingLink.prototype, "fulfillment_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return fulfillment_1.Fulfillment; }, function (ful) { return ful.tracking_links; }),
        (0, typeorm_1.JoinColumn)({ name: "fulfillment_id" }),
        __metadata("design:type", fulfillment_1.Fulfillment)
    ], TrackingLink.prototype, "fulfillment", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], TrackingLink.prototype, "idempotency_key", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], TrackingLink.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TrackingLink.prototype, "beforeInsert", null);
    TrackingLink = __decorate([
        (0, typeorm_1.Entity)()
    ], TrackingLink);
    return TrackingLink;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.TrackingLink = TrackingLink;
/**
 * @schema TrackingLink
 * title: "Tracking Link"
 * description: "Tracking Link holds information about tracking numbers for a Fulfillment. Tracking Links can optionally contain a URL that can be visited to see the status of the shipment."
 * type: object
 * required:
 *   - tracking_number
 *   - fulfillment_id
 * properties:
 *   id:
 *     type: string
 *     description: The tracking link's ID
 *     example: tlink_01G8ZH853Y6TFXWPG5EYE81X63
 *   url:
 *     description: "The URL at which the status of the shipment can be tracked."
 *     type: string
 *     format: uri
 *   tracking_number:
 *     description: "The tracking number given by the shipping carrier."
 *     type: string
 *     format: RH370168054CN
 *   fulfillment_id:
 *     type: string
 *     description: "The id of the Fulfillment that the Tracking Link references."
 *     example: ful_01G8ZRTMQCA76TXNAT81KPJZRF
 *   fulfillment:
 *     description: Available if the relation `fulfillment` is expanded.
 *     $ref: "#/components/schemas/Fulfillment"
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of a process in case of failure.
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
//# sourceMappingURL=tracking-link.js.map