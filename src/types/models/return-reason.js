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
exports.ReturnReason = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var ReturnReason = /** @class */ (function (_super) {
    __extends(ReturnReason, _super);
    function ReturnReason() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReturnReason_1 = ReturnReason;
    ReturnReason.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "rr");
    };
    var ReturnReason_1;
    __decorate([
        (0, typeorm_1.Index)({ unique: true }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ReturnReason.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ReturnReason.prototype, "label", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ReturnReason.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], ReturnReason.prototype, "parent_return_reason_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return ReturnReason_1; }, { cascade: ["soft-remove"] }),
        (0, typeorm_1.JoinColumn)({ name: "parent_return_reason_id" }),
        __metadata("design:type", Object)
    ], ReturnReason.prototype, "parent_return_reason", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ReturnReason_1; }, function (return_reason) { return return_reason.parent_return_reason; }, { cascade: ["insert", "soft-remove"] }),
        __metadata("design:type", Array)
    ], ReturnReason.prototype, "return_reason_children", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ReturnReason.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ReturnReason.prototype, "beforeInsert", null);
    ReturnReason = ReturnReason_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], ReturnReason);
    return ReturnReason;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.ReturnReason = ReturnReason;
/**
 * @schema ReturnReason
 * title: "Return Reason"
 * description: "A Reason for why a given product is returned. A Return Reason can be used on Return Items in order to indicate why a Line Item was returned."
 * type: object
 * required:
 *   - value
 *   - label
 * properties:
 *   id:
 *     type: string
 *     description: The cart's ID
 *     example: rr_01G8X82GCCV2KSQHDBHSSAH5TQ
 *   description:
 *     description: "A description of the Reason."
 *     type: string
 *     example: Items that are damaged
 *   label:
 *     description: "A text that can be displayed to the Customer as a reason."
 *     type: string
 *     example: Damaged goods
 *   value:
 *     description: "The value to identify the reason by."
 *     type: string
 *     example: damaged
 *   parent_return_reason_id:
 *     type: string
 *     description: The ID of the parent reason.
 *     example: null
 *   parent_return_reason:
 *     description: Available if the relation `parent_return_reason` is expanded.
 *     $ref: "#/components/schemas/ReturnReason"
 *   return_reason_children:
 *     description: Available if the relation `return_reason_children` is expanded.
 *     $ref: "#/components/schemas/ReturnReason"
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
//# sourceMappingURL=return-reason.js.map