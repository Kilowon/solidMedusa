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
exports.ProductVariant = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var money_amount_1 = require("./money-amount");
var product_1 = require("./product");
var product_option_value_1 = require("./product-option-value");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var ProductVariant = /** @class */ (function (_super) {
    __extends(ProductVariant, _super);
    function ProductVariant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductVariant.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "variant");
    };
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "product_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_1.Product; }, function (product) { return product.variants; }, { eager: true }),
        (0, typeorm_1.JoinColumn)({ name: "product_id" }),
        __metadata("design:type", product_1.Product)
    ], ProductVariant.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return money_amount_1.MoneyAmount; }, function (ma) { return ma.variant; }, {
            cascade: true,
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], ProductVariant.prototype, "prices", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        (0, typeorm_1.Index)({ unique: true, where: "deleted_at IS NULL" }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "sku", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        (0, typeorm_1.Index)({ unique: true, where: "deleted_at IS NULL" }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "barcode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        (0, typeorm_1.Index)({ unique: true, where: "deleted_at IS NULL" }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "ean", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        (0, typeorm_1.Index)({ unique: true, where: "deleted_at IS NULL" }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "upc", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, default: 0, select: false }),
        __metadata("design:type", Number)
    ], ProductVariant.prototype, "variant_rank", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], ProductVariant.prototype, "inventory_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], ProductVariant.prototype, "allow_backorder", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], ProductVariant.prototype, "manage_inventory", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "hs_code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "origin_country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "mid_code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ProductVariant.prototype, "material", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ProductVariant.prototype, "weight", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ProductVariant.prototype, "length", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ProductVariant.prototype, "height", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], ProductVariant.prototype, "width", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_option_value_1.ProductOptionValue; }, function (optionValue) { return optionValue.variant; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], ProductVariant.prototype, "options", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ProductVariant.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductVariant.prototype, "beforeInsert", null);
    ProductVariant = __decorate([
        (0, typeorm_1.Entity)()
    ], ProductVariant);
    return ProductVariant;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.ProductVariant = ProductVariant;
/**
 * @schema ProductVariant
 * title: "Product Variant"
 * description: "Product Variants represent a Product with a specific set of Product Option configurations. The maximum number of Product Variants that a Product can have is given by the number of available Product Option combinations."
 * type: object
 * required:
 *   - title
 *   - product_id
 *   - inventory_quantity
 * properties:
 *   id:
 *     type: string
 *     description: The product variant's ID
 *     example: variant_01G1G5V2MRX2V3PVSR2WXYPFB6
 *   title:
 *     description: "A title that can be displayed for easy identification of the Product Variant."
 *     type: string
 *     example: Small
 *   product_id:
 *     description: "The ID of the Product that the Product Variant belongs to."
 *     type: string
 *     example: prod_01G1G5V2MBA328390B5AXJ610F
 *   product:
 *     description: A product object. Available if the relation `product` is expanded.
 *     type: object
 *   prices:
 *     description: The Money Amounts defined for the Product Variant. Each Money Amount represents a price in a given currency or a price in a specific Region. Available if the relation `prices` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/MoneyAmount"
 *   sku:
 *     description: "The unique stock keeping unit used to identify the Product Variant. This will usually be a unqiue identifer for the item that is to be shipped, and can be referenced across multiple systems."
 *     type: string
 *     example: shirt-123
 *   barcode:
 *     description: "A generic field for a GTIN number that can be used to identify the Product Variant."
 *     type: string
 *     example: null
 *   ean:
 *     description: "An EAN barcode number that can be used to identify the Product Variant."
 *     type: string
 *     example: null
 *   upc:
 *     description: "A UPC barcode number that can be used to identify the Product Variant."
 *     type: string
 *     example: null
 *   variant_rank:
 *     description: The ranking of this variant
 *     type: number
 *     default: 0
 *   inventory_quantity:
 *     description: "The current quantity of the item that is stocked."
 *     type: integer
 *     example: 100
 *   allow_backorder:
 *     description: "Whether the Product Variant should be purchasable when `inventory_quantity` is 0."
 *     type: boolean
 *     default: false
 *   manage_inventory:
 *     description: "Whether Medusa should manage inventory for the Product Variant."
 *     type: boolean
 *     default: true
 *   hs_code:
 *     description: "The Harmonized System code of the Product Variant. May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   origin_country:
 *     description: "The country in which the Product Variant was produced. May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   mid_code:
 *     description: "The Manufacturers Identification code that identifies the manufacturer of the Product Variant. May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   material:
 *     description: "The material and composition that the Product Variant is made of, May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   weight:
 *     description: "The weight of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   height:
 *     description: "The height of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   width:
 *     description: "The width of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   length:
 *     description: "The length of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   options:
 *     description: The Product Option Values specified for the Product Variant. Available if the relation `options` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ProductOptionValue"
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
/**
 * @schema ProductVariantPricesFields
 * title: "Product Variant Prices Fields"
 * description: "Product Variants Prices Fields that are only available in some requests."
 * type: object
 * properties:
 *   original_price:
 *     type: number
 *     description: The original price of the variant without any discounted prices applied.
 *   calculated_price:
 *     type: number
 *     description: The calculated price of the variant. Can be a discounted price.
 *   original_price_incl_tax:
 *     type: number
 *     description: The original price of the variant including taxes.
 *   calculated_price_incl_tax:
 *     type: number
 *     description: The calculated price of the variant including taxes.
 *   original_tax:
 *     type: number
 *     description: The taxes applied on the original price.
 *   calculated_tax:
 *     type: number
 *     description: The taxes applied on the calculated price.
 *   tax_rates:
 *     type: array
 *     description: An array of applied tax rates
 *     items:
 *       type: object
 *       properties:
 *         rate:
 *           type: number
 *           description: The tax rate value
 *         name:
 *           type: string
 *           description: The name of the tax rate
 *         code:
 *           type: string
 *           description: The code of the tax rate
 */
//# sourceMappingURL=product-variant.js.map