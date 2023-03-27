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
exports.Store = void 0;
var typeorm_1 = require("typeorm");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var base_entity_1 = require("../interfaces/models/base-entity");
var currency_1 = require("./currency");
var db_aware_column_1 = require("../utils/db-aware-column");
var sales_channel_1 = require("./sales-channel");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Store.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "store");
    };
    __decorate([
        (0, typeorm_1.Column)({ default: "Medusa Store" }),
        __metadata("design:type", String)
    ], Store.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "usd" }),
        __metadata("design:type", String)
    ], Store.prototype, "default_currency_code", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return currency_1.Currency; }),
        (0, typeorm_1.JoinColumn)({ name: "default_currency_code", referencedColumnName: "code" }),
        __metadata("design:type", currency_1.Currency)
    ], Store.prototype, "default_currency", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return currency_1.Currency; }),
        (0, typeorm_1.JoinTable)({
            name: "store_currencies",
            joinColumn: {
                name: "store_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "currency_code",
                referencedColumnName: "code",
            },
        }),
        __metadata("design:type", Array)
    ], Store.prototype, "currencies", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Store.prototype, "swap_link_template", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Store.prototype, "payment_link_template", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Store.prototype, "invite_link_template", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Store.prototype, "default_location_id", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Store.prototype, "metadata", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)("sales_channels", { nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], Store.prototype, "default_sales_channel_id", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagDecorators)("sales_channels", [
            (0, typeorm_1.OneToOne)(function () { return sales_channel_1.SalesChannel; }),
            (0, typeorm_1.JoinColumn)({ name: "default_sales_channel_id" }),
        ]),
        __metadata("design:type", sales_channel_1.SalesChannel)
    ], Store.prototype, "default_sales_channel", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Store.prototype, "beforeInsert", null);
    Store = __decorate([
        (0, typeorm_1.Entity)()
    ], Store);
    return Store;
}(base_entity_1.BaseEntity));
exports.Store = Store;
/**
 * @schema Store
 * title: "Store"
 * description: "Holds settings for the Store, such as name, currencies, etc."
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The store's ID
 *     example: store_01G1G5V21KADXNGH29BJMAJ4B4
 *   name:
 *     description: "The name of the Store - this may be displayed to the Customer."
 *     type: string
 *     example: Medusa Store
 *   default_currency_code:
 *     description: "The 3 character currency code that is the default of the store."
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   default_currency:
 *     description: Available if the relation `default_currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   currencies:
 *     description: The currencies that are enabled for the Store. Available if the relation `currencies` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Currency"
 *   swap_link_template:
 *     description: "A template to generate Swap links from. Use {{cart_id}} to include the Swap's `cart_id` in the link."
 *     type: string
 *     example: null
 *   payment_link_template:
 *     description: "A template to generate Payment links from. Use {{cart_id}} to include the payment's `cart_id` in the link."
 *     type: string
 *     example: null
 *   invite_link_template:
 *     description: "A template to generate Invite links from"
 *     type: string
 *     example: null
 *   default_sales_channel_id:
 *     type: string
 *     description: The sales channel ID the cart is associated with.
 *     example: null
 *   default_sales_channel:
 *     description: A sales channel object. Available if the relation `default_sales_channel` is expanded.
 *     type: object
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
//# sourceMappingURL=store.js.map