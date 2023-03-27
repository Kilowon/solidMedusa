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
exports.OrderItemChange = exports.OrderEditItemChangeType = void 0;
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
var order_editing_1 = __importDefault(require("../loaders/feature-flags/order-editing"));
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var utils_1 = require("../utils");
var db_aware_column_1 = require("../utils/db-aware-column");
var order_edit_1 = require("./order-edit");
var line_item_1 = require("./line-item");
var OrderEditItemChangeType;
(function (OrderEditItemChangeType) {
    OrderEditItemChangeType["ITEM_ADD"] = "item_add";
    OrderEditItemChangeType["ITEM_REMOVE"] = "item_remove";
    OrderEditItemChangeType["ITEM_UPDATE"] = "item_update";
})(OrderEditItemChangeType = exports.OrderEditItemChangeType || (exports.OrderEditItemChangeType = {}));
var OrderItemChange = /** @class */ (function (_super) {
    __extends(OrderItemChange, _super);
    function OrderItemChange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderItemChange.prototype.beforeInsert = function () {
        this.id = (0, utils_1.generateEntityId)(this.id, "oic");
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: OrderEditItemChangeType,
        }),
        __metadata("design:type", String)
    ], OrderItemChange.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], OrderItemChange.prototype, "order_edit_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_edit_1.OrderEdit; }, function (oe) { return oe.changes; }),
        (0, typeorm_1.JoinColumn)({ name: "order_edit_id" }),
        __metadata("design:type", order_edit_1.OrderEdit)
    ], OrderItemChange.prototype, "order_edit", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], OrderItemChange.prototype, "original_line_item_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return line_item_1.LineItem; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)({ name: "original_line_item_id" }),
        __metadata("design:type", line_item_1.LineItem)
    ], OrderItemChange.prototype, "original_line_item", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], OrderItemChange.prototype, "line_item_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return line_item_1.LineItem; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)({ name: "line_item_id" }),
        __metadata("design:type", line_item_1.LineItem)
    ], OrderItemChange.prototype, "line_item", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OrderItemChange.prototype, "beforeInsert", null);
    OrderItemChange = __decorate([
        (0, feature_flag_decorators_1.FeatureFlagEntity)(order_editing_1.default.key),
        (0, typeorm_1.Unique)(["order_edit_id", "original_line_item_id"]),
        (0, typeorm_1.Unique)(["order_edit_id", "line_item_id"])
    ], OrderItemChange);
    return OrderItemChange;
}(interfaces_1.SoftDeletableEntity));
exports.OrderItemChange = OrderItemChange;
/**
 * @schema OrderItemChange
 * title: "Order Item Change"
 * description: "Represents an order edit item change"
 * type: object
 * required:
 *   - type
 *   - order_edit_id
 * properties:
 *   id:
 *     type: string
 *     description: The order item change's ID
 *     example: oic_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   type:
 *     type: string
 *     description: The order item change's status
 *     enum:
 *       - item_add
 *       - item_remove
 *       - item_update
 *   order_edit_id:
 *     type: string
 *     description: The ID of the order edit
 *     example: oe_01G2SG30J8C85S4A5CHM2S1NS2
 *   order_edit:
 *     description: Available if the relation `order_edit` is expanded.
 *     $ref: "#/components/schemas/OrderEdit"
 *   original_line_item_id:
 *      type: string
 *      description: The ID of the original line item in the order
 *      example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   original_line_item:
 *      description: Available if the relation `original_line_item` is expanded.
 *      $ref: "#/components/schemas/LineItem"
 *   line_item_id:
 *      type: string
 *      description: The ID of the cloned line item.
 *      example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   line_item:
 *      description: Available if the relation `line_item` is expanded.
 *      $ref: "#/components/schemas/LineItem"
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
//# sourceMappingURL=order-item-change.js.map