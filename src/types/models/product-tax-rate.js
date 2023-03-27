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
exports.ProductTaxRate = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var product_1 = require("./product");
var tax_rate_1 = require("./tax-rate");
var ProductTaxRate = /** @class */ (function () {
    function ProductTaxRate() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], ProductTaxRate.prototype, "product_id", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], ProductTaxRate.prototype, "rate_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_1.Product; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "product_id" }),
        __metadata("design:type", product_1.Product
        // Note the onDelete config here
        )
    ], ProductTaxRate.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return tax_rate_1.TaxRate; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)({ name: "rate_id" }),
        __metadata("design:type", tax_rate_1.TaxRate)
    ], ProductTaxRate.prototype, "tax_rate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], ProductTaxRate.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], ProductTaxRate.prototype, "updated_at", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ProductTaxRate.prototype, "metadata", void 0);
    ProductTaxRate = __decorate([
        (0, typeorm_1.Entity)()
    ], ProductTaxRate);
    return ProductTaxRate;
}());
exports.ProductTaxRate = ProductTaxRate;
/**
 * @schema ProductTaxRate
 * title: "Product Tax Rate"
 * description: "Associates a tax rate with a product to indicate that the product is taxed in a certain way"
 * type: object
 * required:
 *   - product_id
 *   - rate_id
 * properties:
 *   product_id:
 *     description: "The ID of the Product"
 *     type: string
 *     example: prod_01G1G5V2MBA328390B5AXJ610F
 *   product:
 *     description: Available if the relation `product` is expanded.
 *     $ref: "#/components/schemas/Product"
 *   rate_id:
 *     description: "The ID of the Tax Rate"
 *     type: string
 *     example: txr_01G8XDBAWKBHHJRKH0AV02KXBR
 *   tax_rate:
 *     description: Available if the relation `tax_rate` is expanded.
 *     $ref: "#/components/schemas/TaxRate"
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
//# sourceMappingURL=product-tax-rate.js.map