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
exports.ProductVariantInventoryItem = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../interfaces/models/base-entity");
var utils_1 = require("../utils");
var ProductVariantInventoryItem = /** @class */ (function (_super) {
    __extends(ProductVariantInventoryItem, _super);
    function ProductVariantInventoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductVariantInventoryItem.prototype.beforeInsert = function () {
        this.id = (0, utils_1.generateEntityId)(this.id, "pvitem");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, utils_1.DbAwareColumn)({ type: "text" }),
        __metadata("design:type", String)
    ], ProductVariantInventoryItem.prototype, "inventory_item_id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, utils_1.DbAwareColumn)({ type: "text" }),
        __metadata("design:type", String)
    ], ProductVariantInventoryItem.prototype, "variant_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], ProductVariantInventoryItem.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductVariantInventoryItem.prototype, "beforeInsert", null);
    ProductVariantInventoryItem = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(["variant_id", "inventory_item_id"])
    ], ProductVariantInventoryItem);
    return ProductVariantInventoryItem;
}(base_entity_1.BaseEntity));
exports.ProductVariantInventoryItem = ProductVariantInventoryItem;
//# sourceMappingURL=product-variant-inventory-item.js.map