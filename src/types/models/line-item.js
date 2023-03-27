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
exports.LineItem = void 0;
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
var cart_1 = require("./cart");
var claim_order_1 = require("./claim-order");
var db_aware_column_1 = require("../utils/db-aware-column");
var line_item_adjustment_1 = require("./line-item-adjustment");
var line_item_tax_line_1 = require("./line-item-tax-line");
var order_1 = require("./order");
var product_variant_1 = require("./product-variant");
var swap_1 = require("./swap");
var utils_1 = require("../utils");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var tax_inclusive_pricing_1 = __importDefault(require("../loaders/feature-flags/tax-inclusive-pricing"));
var order_editing_1 = __importDefault(require("../loaders/feature-flags/order-editing"));
var order_edit_1 = require("./order-edit");
var LineItem = /** @class */ (function (_super) {
    __extends(LineItem, _super);
    function LineItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineItem.prototype.beforeInsert = function () {
        this.id = (0, utils_1.generateEntityId)(this.id, "item");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], LineItem.prototype, "cart_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cart_1.Cart; }, function (cart) { return cart.items; }),
        (0, typeorm_1.JoinColumn)({ name: "cart_id" }),
        __metadata("design:type", cart_1.Cart)
    ], LineItem.prototype, "cart", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return order_1.Order; }, function (order) { return order.items; }),
        (0, typeorm_1.JoinColumn)({ name: "order_id" }),
        __metadata("design:type", order_1.Order)
    ], LineItem.prototype, "order", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], LineItem.prototype, "swap_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return swap_1.Swap; }, function (swap) { return swap.additional_items; }),
        (0, typeorm_1.JoinColumn)({ name: "swap_id" }),
        __metadata("design:type", swap_1.Swap)
    ], LineItem.prototype, "swap", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], LineItem.prototype, "claim_order_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return claim_order_1.ClaimOrder; }, function (co) { return co.additional_items; }),
        (0, typeorm_1.JoinColumn)({ name: "claim_order_id" }),
        __metadata("design:type", claim_order_1.ClaimOrder)
    ], LineItem.prototype, "claim_order", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return line_item_tax_line_1.LineItemTaxLine; }, function (tl) { return tl.item; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], LineItem.prototype, "tax_lines", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return line_item_adjustment_1.LineItemAdjustment; }, function (lia) { return lia.item; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], LineItem.prototype, "adjustments", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)(order_editing_1.default.key, {
            nullable: true,
            type: "varchar",
        }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "original_item_id", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)(order_editing_1.default.key, {
            nullable: true,
            type: "varchar",
        }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "order_edit_id", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagDecorators)(order_editing_1.default.key, [
            (0, typeorm_1.ManyToOne)(function () { return order_edit_1.OrderEdit; }, function (orderEdit) { return orderEdit.items; }),
            (0, typeorm_1.JoinColumn)({ name: "order_edit_id" }),
        ]),
        __metadata("design:type", Object)
    ], LineItem.prototype, "order_edit", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], LineItem.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "thumbnail", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], LineItem.prototype, "is_return", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], LineItem.prototype, "is_giftcard", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], LineItem.prototype, "should_merge", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], LineItem.prototype, "allow_discounts", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "boolean" }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "has_shipping", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], LineItem.prototype, "unit_price", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true, type: "text" }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "variant_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_variant_1.ProductVariant; }, { eager: true }),
        (0, typeorm_1.JoinColumn)({ name: "variant_id" }),
        __metadata("design:type", product_variant_1.ProductVariant)
    ], LineItem.prototype, "variant", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], LineItem.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "int" }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "fulfilled_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "int" }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "returned_quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: "int" }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "shipped_quantity", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], LineItem.prototype, "metadata", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)(tax_inclusive_pricing_1.default.key, { default: false }),
        __metadata("design:type", Boolean)
    ], LineItem.prototype, "includes_tax", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LineItem.prototype, "beforeInsert", null);
    LineItem = __decorate([
        (0, typeorm_1.Check)("\"fulfilled_quantity\" <= \"quantity\""),
        (0, typeorm_1.Check)("\"shipped_quantity\" <= \"fulfilled_quantity\""),
        (0, typeorm_1.Check)("\"returned_quantity\" <= \"quantity\""),
        (0, typeorm_1.Check)("\"quantity\" > 0"),
        (0, feature_flag_decorators_1.FeatureFlagClassDecorators)(order_editing_1.default.key, [
            (0, typeorm_1.Index)("unique_li_original_item_id_order_edit_id", ["order_edit_id", "original_item_id"], {
                unique: true,
                where: "WHERE original_item_id IS NOT NULL AND order_edit_id IS NOT NULL",
            }),
        ]),
        (0, typeorm_1.Entity)()
    ], LineItem);
    return LineItem;
}(interfaces_1.BaseEntity));
exports.LineItem = LineItem;
/**
 * @schema LineItem
 * title: "Line Item"
 * description: "Line Items represent purchasable units that can be added to a Cart for checkout. When Line Items are purchased they will get copied to the resulting order and can eventually be referenced in Fulfillments and Returns. Line Items may also be created when processing Swaps and Claims."
 * type: object
 * required:
 *   - title
 *   - unit_price
 *   - quantity
 * properties:
 *   id:
 *     type: string
 *     description: The cart's ID
 *     example: item_01G8ZC9GWT6B2GP5FSXRXNFNGN
 *   cart_id:
 *     description: "The ID of the Cart that the Line Item belongs to."
 *     type: string
 *     example: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   cart:
 *     description: A cart object. Available if the relation `cart` is expanded.
 *     type: object
 *   order_id:
 *     description: "The ID of the Order that the Line Item belongs to."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   order:
 *     description: An order object. Available if the relation `order` is expanded.
 *     type: object
 *   swap_id:
 *     description: "The id of the Swap that the Line Item belongs to."
 *     type: string
 *     example: null
 *   swap:
 *     description: A swap object. Available if the relation `swap` is expanded.
 *     type: object
 *   claim_order_id:
 *     description: "The id of the Claim that the Line Item belongs to."
 *     type: string
 *     example: null
 *   claim_order:
 *     description: A claim order object. Available if the relation `claim_order` is expanded.
 *     type: object
 *   tax_lines:
 *     description: Available if the relation `tax_lines` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/LineItemTaxLine"
 *   adjustments:
 *     description: Available if the relation `adjustments` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/LineItemAdjustment"
 *   title:
 *     description: "The title of the Line Item, this should be easily identifiable by the Customer."
 *     type: string
 *     example: Medusa Coffee Mug
 *   description:
 *     description: "A more detailed description of the contents of the Line Item."
 *     type: string
 *     example: One Size
 *   thumbnail:
 *     description: "A URL string to a small image of the contents of the Line Item."
 *     type: string
 *     format: uri
 *     example: https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png
 *   is_return:
 *     description: "Is the item being returned"
 *     type: boolean
 *     example: false
 *   is_giftcard:
 *     description: "Flag to indicate if the Line Item is a Gift Card."
 *     type: boolean
 *     example: false
 *   should_merge:
 *     description: "Flag to indicate if new Line Items with the same variant should be merged or added as an additional Line Item."
 *     type: boolean
 *     example: false
 *   allow_discounts:
 *     description: "Flag to indicate if the Line Item should be included when doing discount calculations."
 *     type: boolean
 *     example: false
 *   has_shipping:
 *     description: "Flag to indicate if the Line Item has fulfillment associated with it."
 *     type: boolean
 *     example: false
 *   unit_price:
 *     description: "The price of one unit of the content in the Line Item. This should be in the currency defined by the Cart/Order/Swap/Claim that the Line Item belongs to."
 *     type: boolean
 *     example: 8000
 *   variant_id:
 *     description: "The id of the Product Variant contained in the Line Item."
 *     type: string
 *     example: variant_01G1G5V2MRX2V3PVSR2WXYPFB6
 *   variant:
 *     description: A product variant object. The Product Variant contained in the Line Item. Available if the relation `variant` is expanded.
 *     type: object
 *   quantity:
 *     description: "The quantity of the content in the Line Item."
 *     type: integer
 *     example: 1
 *   fulfilled_quantity:
 *     description: "The quantity of the Line Item that has been fulfilled."
 *     type: integer
 *     example: 0
 *   returned_quantity:
 *     description: "The quantity of the Line Item that has been returned."
 *     type: integer
 *     example: 0
 *   shipped_quantity:
 *     description: "The quantity of the Line Item that has been shipped."
 *     type: integer
 *     example: 0
 *   refundable:
 *     description: "The amount that can be refunded from the given Line Item. Takes taxes and discounts into consideration."
 *     type: integer
 *     example: 0
 *   subtotal:
 *     type: integer
 *     description: The subtotal of the line item
 *     example: 8000
 *   tax_total:
 *     type: integer
 *     description: The total of tax of the line item
 *     example: 0
 *   total:
 *     type: integer
 *     description: The total amount of the line item
 *     example: 8000
 *   original_total:
 *     type: integer
 *     description: The original total amount of the line item
 *     example: 8000
 *   original_tax_total:
 *     type: integer
 *     description: The original tax total amount of the line item
 *     example: 0
 *   discount_total:
 *     type: integer
 *     description: The total of discount of the line item
 *     example: 0
 *   gift_card_total:
 *     type: integer
 *     description: The total of the gift card of the line item
 *     example: 0
 *   includes_tax:
 *     description: "[EXPERIMENTAL] Indicates if the line item unit_price include tax"
 *     type: boolean
 *   original_item_id:
 *     description: "[EXPERIMENTAL] The id of the original line item"
 *     type: string
 *   order_edit_id:
 *     description: "[EXPERIMENTAL] The ID of the order edit to which a cloned item belongs"
 *     type: string
 *   order_edit:
 *     description: "[EXPERIMENTAL] The order edit joined"
 *     type: object
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
//# sourceMappingURL=line-item.js.map