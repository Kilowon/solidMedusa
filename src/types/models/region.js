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
exports.Region = void 0;
var typeorm_1 = require("typeorm");
var country_1 = require("./country");
var currency_1 = require("./currency");
var db_aware_column_1 = require("../utils/db-aware-column");
var fulfillment_provider_1 = require("./fulfillment-provider");
var payment_provider_1 = require("./payment-provider");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var tax_provider_1 = require("./tax-provider");
var tax_rate_1 = require("./tax-rate");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var tax_inclusive_pricing_1 = __importDefault(require("../loaders/feature-flags/tax-inclusive-pricing"));
var Region = /** @class */ (function (_super) {
    __extends(Region, _super);
    function Region() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Region.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "reg");
    };
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Region.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Region.prototype, "currency_code", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return currency_1.Currency; }),
        (0, typeorm_1.JoinColumn)({ name: "currency_code", referencedColumnName: "code" }),
        __metadata("design:type", currency_1.Currency)
    ], Region.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "real" }),
        __metadata("design:type", Number)
    ], Region.prototype, "tax_rate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return tax_rate_1.TaxRate; }, function (tr) { return tr.region; }),
        __metadata("design:type", Object)
    ], Region.prototype, "tax_rates", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Region.prototype, "tax_code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], Region.prototype, "gift_cards_taxable", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], Region.prototype, "automatic_taxes", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return country_1.Country; }, function (c) { return c.region; }),
        __metadata("design:type", Array)
    ], Region.prototype, "countries", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", Object)
    ], Region.prototype, "tax_provider_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return tax_provider_1.TaxProvider; }),
        (0, typeorm_1.JoinColumn)({ name: "tax_provider_id" }),
        __metadata("design:type", tax_provider_1.TaxProvider)
    ], Region.prototype, "tax_provider", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return payment_provider_1.PaymentProvider; }, {
            eager: true,
            cascade: ["insert", "update"],
        }),
        (0, typeorm_1.JoinTable)({
            name: "region_payment_providers",
            joinColumn: {
                name: "region_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "provider_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], Region.prototype, "payment_providers", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return fulfillment_provider_1.FulfillmentProvider; }, {
            eager: true,
            cascade: ["insert", "update"],
        }),
        (0, typeorm_1.JoinTable)({
            name: "region_fulfillment_providers",
            joinColumn: {
                name: "region_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "provider_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], Region.prototype, "fulfillment_providers", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Region.prototype, "metadata", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)(tax_inclusive_pricing_1.default.key, { default: false }),
        __metadata("design:type", Boolean)
    ], Region.prototype, "includes_tax", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Region.prototype, "beforeInsert", null);
    Region = __decorate([
        (0, typeorm_1.Entity)()
    ], Region);
    return Region;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.Region = Region;
/**
 * @schema Region
 * title: "Region"
 * description: "Regions hold settings for how Customers in a given geographical location shop. The is, for example, where currencies and tax rates are defined. A Region can consist of multiple countries to accomodate common shopping settings across countries."
 * type: object
 * required:
 *   - name
 *   - currency_code
 *   - tax_rate
 * properties:
 *   id:
 *     type: string
 *     description: The region's ID
 *     example: reg_01G1G5V26T9H8Y0M4JNE3YGA4G
 *   name:
 *     description: "The name of the region as displayed to the customer. If the Region only has one country it is recommended to write the country name."
 *     type: string
 *     example: EU
 *   currency_code:
 *     description: "The 3 character currency code that the Region uses."
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   currency:
 *     description: Available if the relation `currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   tax_rate:
 *     description: "The tax rate that should be charged on purchases in the Region."
 *     type: number
 *     example: 0
 *   tax_rates:
 *     description: The tax rates that are included in the Region. Available if the relation `tax_rates` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/TaxRate"
 *   tax_code:
 *     description: "The tax code used on purchases in the Region. This may be used by other systems for accounting purposes."
 *     type: string
 *     example: null
 *   gift_cards_taxable:
 *     description: Whether the gift cards are taxable or not in this region.
 *     type: boolean
 *     default: true
 *   automatic_taxes:
 *     description: Whether taxes should be automated in this region.
 *     type: boolean
 *     default: true
 *   countries:
 *     description: The countries that are included in the Region. Available if the relation `countries` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Country"
 *   tax_provider_id:
 *     type: string
 *     description: The ID of the tax provider used in this region
 *     example: null
 *   tax_provider:
 *     description: Available if the relation `tax_provider` is expanded.
 *     $ref: "#/components/schemas/TaxProvider"
 *   payment_providers:
 *     description: The Payment Providers that can be used to process Payments in the Region. Available if the relation `payment_providers` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/PaymentProvider"
 *   fulfillment_providers:
 *     description: The Fulfillment Providers that can be used to fulfill orders in the Region. Available if the relation `payment_providers` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/FulfillmentProvider"
 *   includes_tax:
 *     description: "[EXPERIMENTAL] Does the prices for the region include tax"
 *     type: boolean
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
//# sourceMappingURL=region.js.map