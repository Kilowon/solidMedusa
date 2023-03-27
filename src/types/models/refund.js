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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refund = exports.RefundReason = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../interfaces/models/base-entity");
var db_aware_column_1 = require("../utils/db-aware-column");
var order_1 = require("./order");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var payment_1 = require("./payment");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var order_editing_1 = __importDefault(require("../loaders/feature-flags/order-editing"));
var RefundReason;
(function (RefundReason) {
    RefundReason["DISCOUNT"] = "discount";
    RefundReason["RETURN"] = "return";
    RefundReason["SWAP"] = "swap";
    RefundReason["CLAIM"] = "claim";
    RefundReason["OTHER"] = "other";
})(RefundReason = exports.RefundReason || (exports.RefundReason = {}));
var Refund = /** @class */ (function (_super) {
    __extends(Refund, _super);
    function Refund() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Refund.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "ref");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Refund.prototype, "order_id", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagDecorators)(order_editing_1.default.key, [
            (0, typeorm_1.Index)(),
            (0, typeorm_1.Column)({ nullable: true }),
        ]),
        __metadata("design:type", String)
    ], Refund.prototype, "payment_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (order) { return order.payments; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], Refund.prototype, "order", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagDecorators)(order_editing_1.default.key, [
            (0, typeorm_1.OneToOne)(function () { return payment_1.Payment; }, { nullable: true }),
            (0, typeorm_1.JoinColumn)({ name: "payment_id" }),
        ]),
        __metadata("design:type", payment_1.Payment)
    ], Refund.prototype, "payment", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], Refund.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Refund.prototype, "note", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "enum", enum: RefundReason }),
        __metadata("design:type", String)
    ], Refund.prototype, "reason", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Refund.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Refund.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Refund.prototype, "beforeInsert", null);
    Refund = __decorate([
        (0, typeorm_1.Entity)()
    ], Refund);
    return Refund;
}(base_entity_1.BaseEntity));
exports.Refund = Refund;
/**
 * @schema Refund
 * title: "Refund"
 * description: "Refund represent an amount of money transfered back to the Customer for a given reason. Refunds may occur in relation to Returns, Swaps and Claims, but can also be initiated by a store operator."
 * type: object
 * required:
 *   - order_id
 *   - amount
 * properties:
 *   id:
 *     type: string
 *     description: The refund's ID
 *     example: ref_01G1G5V27GYX4QXNARRQCW1N8T
 *   order_id:
 *     description: "The id of the Order that the Refund is related to."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   amount:
 *     description: "The amount that has be refunded to the Customer."
 *     type: integer
 *     example: 1000
 *   note:
 *     description: "An optional note explaining why the amount was refunded."
 *     type: string
 *     example: I didn't like it
 *   reason:
 *     description: "The reason given for the Refund, will automatically be set when processed as part of a Swap, Claim or Return."
 *     type: string
 *     enum:
 *       - discount
 *       - return
 *       - swap
 *       - claim
 *       - other
 *     example: return
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the completion of the refund in case of failure.
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
//# sourceMappingURL=refund.js.map