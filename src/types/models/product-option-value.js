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
exports.ProductOptionValue = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var product_option_1 = require("./product-option");
var product_variant_1 = require("./product-variant");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var ProductOptionValue = /** @class */ (function (_super) {
    __extends(ProductOptionValue, _super);
    function ProductOptionValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductOptionValue.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "optval");
    };
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ProductOptionValue.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ProductOptionValue.prototype, "option_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_option_1.ProductOption; }, function (option) { return option.values; }),
        (0, typeorm_1.JoinColumn)({ name: "option_id" }),
        __metadata("design:type", product_option_1.ProductOption)
    ], ProductOptionValue.prototype, "option", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ProductOptionValue.prototype, "variant_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_variant_1.ProductVariant; }, function (variant) { return variant.options; }, {
            onDelete: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "variant_id" }),
        __metadata("design:type", product_variant_1.ProductVariant)
    ], ProductOptionValue.prototype, "variant", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ProductOptionValue.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductOptionValue.prototype, "beforeInsert", null);
    ProductOptionValue = __decorate([
        (0, typeorm_1.Entity)()
    ], ProductOptionValue);
    return ProductOptionValue;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.ProductOptionValue = ProductOptionValue;
/**
 * @schema ProductOptionValue
 * title: "Product Option Value"
 * description: "A value given to a Product Variant's option set. Product Variant have a Product Option Value for each of the Product Options defined on the Product."
 * type: object
 * required:
 *   - value
 *   - option_id
 *   - variant_id
 * properties:
 *   id:
 *     type: string
 *     description: The product option value's ID
 *     example: optval_01F0YESHR7S6ECD03RF6W12DSJ
 *   value:
 *     description: "The value that the Product Variant has defined for the specific Product Option (e.g. if the Product Option is \"Size\" this value could be \"Small\", \"Medium\" or \"Large\")."
 *     type: string
 *     example: large
 *   option_id:
 *     description: "The ID of the Product Option that the Product Option Value is defined for."
 *     type: string
 *     example: opt_01F0YESHQBZVKCEXJ24BS6PCX3
 *   option:
 *     description: Available if the relation `option` is expanded.
 *     $ref: "#/components/schemas/ProductOption"
 *   variant_id:
 *     description: "The ID of the Product Variant that the Product Option Value is defined for."
 *     type: string
 *     example: variant_01G1G5V2MRX2V3PVSR2WXYPFB6
 *   variant:
 *     description: Available if the relation `variant` is expanded.
 *     $ref: "#/components/schemas/ProductVariant"
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
//# sourceMappingURL=product-option-value.js.map