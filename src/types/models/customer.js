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
exports.Customer = void 0;
var typeorm_1 = require("typeorm");
var address_1 = require("./address");
var customer_group_1 = require("./customer-group");
var db_aware_column_1 = require("../utils/db-aware-column");
var order_1 = require("./order");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Customer.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "cus");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Customer.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "first_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "last_name", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], Customer.prototype, "billing_address_id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return address_1.Address; }),
        (0, typeorm_1.JoinColumn)({ name: "billing_address_id" }),
        __metadata("design:type", address_1.Address)
    ], Customer.prototype, "billing_address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return address_1.Address; }, function (address) { return address.customer; }),
        __metadata("design:type", Array)
    ], Customer.prototype, "shipping_addresses", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, select: false }),
        __metadata("design:type", String)
    ], Customer.prototype, "password_hash", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Customer.prototype, "has_account", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return order_1.Order; }, function (order) { return order.customer; }),
        __metadata("design:type", Array)
    ], Customer.prototype, "orders", void 0);
    __decorate([
        (0, typeorm_1.JoinTable)({
            name: "customer_group_customers",
            inverseJoinColumn: {
                name: "customer_group_id",
                referencedColumnName: "id",
            },
            joinColumn: {
                name: "customer_id",
                referencedColumnName: "id",
            },
        }),
        (0, typeorm_1.ManyToMany)(function () { return customer_group_1.CustomerGroup; }, function (cg) { return cg.customers; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], Customer.prototype, "groups", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Customer.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Customer.prototype, "beforeInsert", null);
    Customer = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(["email", "has_account"])
    ], Customer);
    return Customer;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.Customer = Customer;
/**
 * @schema Customer
 * title: "Customer"
 * description: "Represents a customer"
 * type: object
 * required:
 *   - email
 * properties:
 *   id:
 *     type: string
 *     description: The customer's ID
 *     example: cus_01G2SG30J8C85S4A5CHM2S1NS2
 *   email:
 *     type: string
 *     description: The customer's email
 *     format: email
 *   first_name:
 *     type: string
 *     description: The customer's first name
 *     example: Arno
 *   last_name:
 *     type: string
 *     description: The customer's last name
 *     example: Willms
 *   billing_address_id:
 *     type: string
 *     description: The customer's billing address ID
 *     example: addr_01G8ZH853YPY9B94857DY91YGW
 *   billing_address:
 *     description: Available if the relation `billing_address` is expanded.
 *     $ref: "#/components/schemas/Address"
 *   shipping_addresses:
 *     description: Available if the relation `shipping_addresses` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Address"
 *   phone:
 *     type: string
 *     description: The customer's phone number
 *     example: 16128234334802
 *   has_account:
 *     type: boolean
 *     description: Whether the customer has an account or not
 *     default: false
 *   orders:
 *     description: Available if the relation `orders` is expanded.
 *     type: array
 *     items:
 *       type: object
 *       description: An order object.
 *   groups:
 *     description: The customer groups the customer belongs to. Available if the relation `groups` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/CustomerGroup"
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
//# sourceMappingURL=customer.js.map