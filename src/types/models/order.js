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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.PaymentStatus = exports.FulfillmentStatus = exports.OrderStatus = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var address_1 = require("./address");
var base_entity_1 = require("../interfaces/models/base-entity");
var cart_1 = require("./cart");
var claim_order_1 = require("./claim-order");
var currency_1 = require("./currency");
var customer_1 = require("./customer");
var discount_1 = require("./discount");
var draft_order_1 = require("./draft-order");
var fulfillment_1 = require("./fulfillment");
var gift_card_1 = require("./gift-card");
var gift_card_transaction_1 = require("./gift-card-transaction");
var line_item_1 = require("./line-item");
var payment_1 = require("./payment");
var refund_1 = require("./refund");
var region_1 = require("./region");
var return_1 = require("./return");
var sales_channel_1 = require("./sales-channel");
var shipping_method_1 = require("./shipping-method");
var swap_1 = require("./swap");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var manual_auto_increment_1 = require("../utils/manual-auto-increment");
var order_edit_1 = require("./order-edit");
var order_editing_1 = __importDefault(require("../loaders/feature-flags/order-editing"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["ARCHIVED"] = "archived";
    OrderStatus["CANCELED"] = "canceled";
    OrderStatus["REQUIRES_ACTION"] = "requires_action";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var FulfillmentStatus;
(function (FulfillmentStatus) {
    FulfillmentStatus["NOT_FULFILLED"] = "not_fulfilled";
    FulfillmentStatus["PARTIALLY_FULFILLED"] = "partially_fulfilled";
    FulfillmentStatus["FULFILLED"] = "fulfilled";
    FulfillmentStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    FulfillmentStatus["SHIPPED"] = "shipped";
    FulfillmentStatus["PARTIALLY_RETURNED"] = "partially_returned";
    FulfillmentStatus["RETURNED"] = "returned";
    FulfillmentStatus["CANCELED"] = "canceled";
    FulfillmentStatus["REQUIRES_ACTION"] = "requires_action";
})(FulfillmentStatus = exports.FulfillmentStatus || (exports.FulfillmentStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["NOT_PAID"] = "not_paid";
    PaymentStatus["AWAITING"] = "awaiting";
    PaymentStatus["CAPTURED"] = "captured";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["CANCELED"] = "canceled";
    PaymentStatus["REQUIRES_ACTION"] = "requires_action";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.object = "order";
        return _this;
    }
    Order.prototype.beforeInsert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var disId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "order");
                        if (!(process.env.NODE_ENV === "development" && !this.display_id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, manual_auto_increment_1.manualAutoIncrement)("order")];
                    case 1:
                        disId = _a.sent();
                        if (disId) {
                            this.display_id = disId;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "enum", enum: OrderStatus, default: "pending" }),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: FulfillmentStatus,
            default: "not_fulfilled",
        }),
        __metadata("design:type", String)
    ], Order.prototype, "fulfillment_status", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "enum", enum: PaymentStatus, default: "not_paid" }),
        __metadata("design:type", String)
    ], Order.prototype, "payment_status", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        (0, typeorm_1.Generated)((0, db_aware_column_1.resolveDbGenerationStrategy)("increment")),
        __metadata("design:type", Number)
    ], Order.prototype, "display_id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "cart_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return cart_1.Cart; }),
        (0, typeorm_1.JoinColumn)({ name: "cart_id" }),
        __metadata("design:type", cart_1.Cart)
    ], Order.prototype, "cart", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Order.prototype, "customer_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return customer_1.Customer; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
        __metadata("design:type", customer_1.Customer)
    ], Order.prototype, "customer", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Order.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "billing_address_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return address_1.Address; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinColumn)({ name: "billing_address_id" }),
        __metadata("design:type", address_1.Address)
    ], Order.prototype, "billing_address", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "shipping_address_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return address_1.Address; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinColumn)({ name: "shipping_address_id" }),
        __metadata("design:type", address_1.Address)
    ], Order.prototype, "shipping_address", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Order.prototype, "region_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return region_1.Region; }),
        (0, typeorm_1.JoinColumn)({ name: "region_id" }),
        __metadata("design:type", region_1.Region)
    ], Order.prototype, "region", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Order.prototype, "currency_code", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return currency_1.Currency; }),
        (0, typeorm_1.JoinColumn)({ name: "currency_code", referencedColumnName: "code" }),
        __metadata("design:type", currency_1.Currency)
    ], Order.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "real", nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "tax_rate", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return discount_1.Discount; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinTable)({
            name: "order_discounts",
            joinColumn: {
                name: "order_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "discount_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], Order.prototype, "discounts", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return gift_card_1.GiftCard; }, { cascade: ["insert"] }),
        (0, typeorm_1.JoinTable)({
            name: "order_gift_cards",
            joinColumn: {
                name: "order_id",
                referencedColumnName: "id",
            },
            inverseJoinColumn: {
                name: "gift_card_id",
                referencedColumnName: "id",
            },
        }),
        __metadata("design:type", Array)
    ], Order.prototype, "gift_cards", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return shipping_method_1.ShippingMethod; }, function (method) { return method.order; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Order.prototype, "shipping_methods", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return payment_1.Payment; }, function (payment) { return payment.order; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], Order.prototype, "payments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return fulfillment_1.Fulfillment; }, function (fulfillment) { return fulfillment.order; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Order.prototype, "fulfillments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return return_1.Return; }, function (ret) { return ret.order; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], Order.prototype, "returns", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return claim_order_1.ClaimOrder; }, function (co) { return co.order; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], Order.prototype, "claims", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return refund_1.Refund; }, function (ref) { return ref.order; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], Order.prototype, "refunds", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return swap_1.Swap; }, function (swap) { return swap.order; }, { cascade: ["insert"] }),
        __metadata("design:type", Array)
    ], Order.prototype, "swaps", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "draft_order_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return draft_order_1.DraftOrder; }),
        (0, typeorm_1.JoinColumn)({ name: "draft_order_id" }),
        __metadata("design:type", draft_order_1.DraftOrder)
    ], Order.prototype, "draft_order", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagDecorators)(order_editing_1.default.key, [
            (0, typeorm_1.OneToMany)(function () { return order_edit_1.OrderEdit; }, function (oe) { return oe.order; }),
        ]),
        __metadata("design:type", Array)
    ], Order.prototype, "edits", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return line_item_1.LineItem; }, function (lineItem) { return lineItem.order; }, {
            cascade: ["insert"],
        }),
        __metadata("design:type", Array)
    ], Order.prototype, "items", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return gift_card_transaction_1.GiftCardTransaction; }, function (gc) { return gc.order; }),
        __metadata("design:type", Array)
    ], Order.prototype, "gift_card_transactions", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], Order.prototype, "canceled_at", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], Order.prototype, "no_notification", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "external_id", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagColumn)("sales_channels", { type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], Order.prototype, "sales_channel_id", void 0);
    __decorate([
        (0, feature_flag_decorators_1.FeatureFlagDecorators)("sales_channels", [
            (0, typeorm_1.ManyToOne)(function () { return sales_channel_1.SalesChannel; }),
            (0, typeorm_1.JoinColumn)({ name: "sales_channel_id" }),
        ]),
        __metadata("design:type", sales_channel_1.SalesChannel
        // Total fields
        )
    ], Order.prototype, "sales_channel", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Order.prototype, "beforeInsert", null);
    Order = __decorate([
        (0, typeorm_1.Entity)()
    ], Order);
    return Order;
}(base_entity_1.BaseEntity));
exports.Order = Order;
/**
 * @schema Order
 * title: "Order"
 * description: "Represents an order"
 * type: object
 * required:
 *   - customer_id
 *   - email
 *   - region_id
 *   - currency_code
 * properties:
 *   id:
 *     type: string
 *     description: The order's ID
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   status:
 *     type: string
 *     description: The order's status
 *     enum:
 *       - pending
 *       - completed
 *       - archived
 *       - canceled
 *       - requires_action
 *     default: pending
 *   fulfillment_status:
 *     type: string
 *     description: The order's fulfillment status
 *     enum:
 *       - not_fulfilled
 *       - partially_fulfilled
 *       - fulfilled
 *       - partially_shipped
 *       - shipped
 *       - partially_returned
 *       - returned
 *       - canceled
 *       - requires_action
 *     default: not_fulfilled
 *   payment_status:
 *     type: string
 *     description: The order's payment status
 *     enum:
 *       - not_paid
 *       - awaiting
 *       - captured
 *       - partially_refunded
 *       - refuneded
 *       - canceled
 *       - requires_action
 *     default: not_paid
 *   display_id:
 *     type: integer
 *     description: The order's display ID
 *     example: 2
 *   cart_id:
 *     type: string
 *     description: The ID of the cart associated with the order
 *     example: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   cart:
 *     description: A cart object. Available if the relation `cart` is expanded.
 *     type: object
 *   customer_id:
 *     type: string
 *     description: The ID of the customer associated with the order
 *     example: cus_01G2SG30J8C85S4A5CHM2S1NS2
 *   customer:
 *     description: A customer object. Available if the relation `customer` is expanded.
 *     type: object
 *   email:
 *     description: The email associated with the order
 *     type: string
 *     format: email
 *   billing_address_id:
 *     type: string
 *     description: The ID of the billing address associated with the order
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   billing_address:
 *     description: Available if the relation `billing_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   shipping_address_id:
 *     type: string
 *     description: The ID of the shipping address associated with the order
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   shipping_address:
 *     description: Available if the relation `shipping_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   region_id:
 *     type: string
 *     description: The region's ID
 *     example: reg_01G1G5V26T9H8Y0M4JNE3YGA4G
 *   region:
 *     description: A region object. Available if the relation `region` is expanded.
 *     type: object
 *   currency_code:
 *     description: "The 3 character currency code that is used in the order"
 *     type: string
 *     example: usd
 *     externalDocs:
 *       url: https://en.wikipedia.org/wiki/ISO_4217#Active_codes
 *       description: See a list of codes.
 *   currency:
 *     description: Available if the relation `currency` is expanded.
 *     $ref: "#/components/schemas/Currency"
 *   tax_rate:
 *     description: The order's tax rate
 *     type: number
 *     example: 0
 *   discounts:
 *     type: array
 *     description: The discounts used in the order. Available if the relation `discounts` is expanded.
 *     items:
 *       type: object
 *       description: A discount object.
 *   gift_cards:
 *     type: array
 *     description: The gift cards used in the order. Available if the relation `gift_cards` is expanded.
 *     items:
 *       type: object
 *       description: A gift card object.
 *   shipping_methods:
 *     type: array
 *     description: The shipping methods used in the order. Available if the relation `shipping_methods` is expanded.
 *     items:
 *       $ref: "#/components/schemas/ShippingMethod"
 *   payments:
 *     type: array
 *     description: The payments used in the order. Available if the relation `payments` is expanded.
 *     items:
 *       $ref: "#/components/schemas/Payment"
 *   fulfillments:
 *     type: array
 *     description: The fulfillments used in the order. Available if the relation `fulfillments` is expanded.
 *     items:
 *       $ref: "#/components/schemas/Fulfillment"
 *   returns:
 *     type: array
 *     description: The returns associated with the order. Available if the relation `returns` is expanded.
 *     items:
 *       type: object
 *       description: A return object.
 *   claims:
 *     type: array
 *     description: The claims associated with the order. Available if the relation `claims` is expanded.
 *     items:
 *       type: object
 *       description: A claim order object.
 *   refunds:
 *     type: array
 *     description: The refunds associated with the order. Available if the relation `refunds` is expanded.
 *     items:
 *       type: object
 *       description: A refund object.
 *   swaps:
 *     type: array
 *     description: The swaps associated with the order. Available if the relation `swaps` is expanded.
 *     items:
 *       type: object
 *       description: A swap object.
 *   draft_order_id:
 *     type: string
 *     description: The ID of the draft order this order is associated with.
 *     example: null
 *   draft_order:
 *     description: A draft order object. Available if the relation `draft_order` is expanded.
 *     type: object
 *   items:
 *     type: array
 *     description: The line items that belong to the order. Available if the relation `items` is expanded.
 *     items:
 *       $ref: "#/components/schemas/LineItem"
 *   edits:
 *     type: array
 *     description: "[EXPERIMENTAL] Order edits done on the order. Available if the relation `edits` is expanded."
 *     items:
 *       $ref: "#/components/schemas/OrderEdit"
 *   gift_card_transactions:
 *     type: array
 *     description: The gift card transactions used in the order. Available if the relation `gift_card_transactions` is expanded.
 *     items:
 *       $ref: "#/components/schemas/GiftCardTransaction"
 *   canceled_at:
 *     type: string
 *     description: The date the order was canceled on.
 *     format: date-time
 *   no_notification:
 *     description: "Flag for describing whether or not notifications related to this should be send."
 *     type: boolean
 *     example: false
 *   idempotency_key:
 *     type: string
 *     description: Randomly generated key used to continue the processing of the order in case of failure.
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 *   external_id:
 *     description: The ID of an external order.
 *     type: string
 *     example: null
 *   sales_channel_id:
 *     type: string
 *     description: The ID of the sales channel this order is associated with.
 *     example: null
 *   sales_channel:
 *     description: A sales channel object. Available if the relation `sales_channel` is expanded.
 *     type: object
 *   shipping_total:
 *     type: integer
 *     description: The total of shipping
 *     example: 1000
 *   discount_total:
 *     type: integer
 *     description: The total of discount
 *     example: 800
 *   tax_total:
 *     type: integer
 *     description: The total of tax
 *     example: 0
 *   refunded_total:
 *     type: integer
 *     description: The total amount refunded if the order is returned.
 *     example: 0
 *   total:
 *     type: integer
 *     description: The total amount of the order
 *     example: 8200
 *   subtotal:
 *     type: integer
 *     description: The subtotal of the order
 *     example: 8000
 *   paid_total:
 *     type: integer
 *     description: The total amount paid
 *     example: 8000
 *   refundable_amount:
 *     type: integer
 *     description: The amount that can be refunded
 *     example: 8200
 *   gift_card_total:
 *     type: integer
 *     description: The total of gift cards
 *     example: 0
 *   gift_card_tax_total:
 *     type: integer
 *     description: The total of gift cards with taxes
 *     example: 0
 */
//# sourceMappingURL=order.js.map