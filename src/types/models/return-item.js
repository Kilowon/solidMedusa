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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnItem = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var line_item_1 = require("./line-item");
var return_1 = require("./return");
var return_reason_1 = require("./return-reason");
var ReturnItem = /** @class */ (function () {
    function ReturnItem() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], ReturnItem.prototype, "return_id", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], ReturnItem.prototype, "item_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return return_1.Return; }),
        (0, typeorm_1.JoinColumn)({ name: "return_id" }),
        __metadata("design:type", return_1.Return)
    ], ReturnItem.prototype, "return_order", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return line_item_1.LineItem; }),
        (0, typeorm_1.JoinColumn)({ name: "item_id" }),
        __metadata("design:type", line_item_1.LineItem)
    ], ReturnItem.prototype, "item", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], ReturnItem.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: true }),
        __metadata("design:type", Boolean)
    ], ReturnItem.prototype, "is_requested", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ReturnItem.prototype, "requested_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ReturnItem.prototype, "received_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ReturnItem.prototype, "reason_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return return_reason_1.ReturnReason; }),
        (0, typeorm_1.JoinColumn)({ name: "reason_id" }),
        __metadata("design:type", return_reason_1.ReturnReason)
    ], ReturnItem.prototype, "reason", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ReturnItem.prototype, "note", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ReturnItem.prototype, "metadata", void 0);
    ReturnItem = __decorate([
        (0, typeorm_1.Entity)()
    ], ReturnItem);
    return ReturnItem;
}());
exports.ReturnItem = ReturnItem;
/**
 * @schema ReturnItem
 * title: "Return Item"
 * description: "Correlates a Line Item with a Return, keeping track of the quantity of the Line Item that will be returned."
 * type: object
 * required:
 *   - return_id
 *   - item_id
 * properties:
 *   return_id:
 *     description: "The id of the Return that the Return Item belongs to."
 *     type: string
 *     example: ret_01F0YET7XPCMF8RZ0Y151NZV2V
 *   return_order:
 *     description: Available if the relation `return_order` is expanded.
 *     $ref: "#/components/schemas/Return"
 *   item_id:
 *     description: "The id of the Line Item that the Return Item references."
 *     type: string
 *     example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   item:
 *     description: Available if the relation `item` is expanded.
 *     $ref: "#/components/schemas/LineItem"
 *   quantity:
 *     description: "The quantity of the Line Item that is included in the Return."
 *     type: integer
 *     example: 1
 *   is_requested:
 *     description: "Whether the Return Item was requested initially or received unexpectedly in the warehouse."
 *     type: boolean
 *     default: true
 *   requested_quantity:
 *     description: "The quantity that was originally requested to be returned."
 *     type: integer
 *     example: 1
 *   recieved_quantity:
 *     description: "The quantity that was received in the warehouse."
 *     type: integer
 *     example: 1
 *   reason_id:
 *     description: The ID of the reason for returning the item.
 *     type: string
 *     example: rr_01G8X82GCCV2KSQHDBHSSAH5TQ
 *   reason:
 *     description: Available if the relation `reason` is expanded.
 *     $ref: "#/components/schemas/ReturnReason"
 *   note:
 *     description: "An optional note with additional details about the Return."
 *     type: string
 *     example: I didn't like it.
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
//# sourceMappingURL=return-item.js.map