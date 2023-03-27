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
exports.Notification = void 0;
var typeorm_1 = require("typeorm");
var base_entity_1 = require("../interfaces/models/base-entity");
var customer_1 = require("./customer");
var db_aware_column_1 = require("../utils/db-aware-column");
var notification_provider_1 = require("./notification-provider");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Notification_1 = Notification;
    Notification.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "noti");
    };
    var Notification_1;
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Notification.prototype, "event_name", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Notification.prototype, "resource_type", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Notification.prototype, "resource_id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], Notification.prototype, "customer_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return customer_1.Customer; }),
        (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
        __metadata("design:type", customer_1.Customer)
    ], Notification.prototype, "customer", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Notification.prototype, "to", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb" }),
        __metadata("design:type", Object)
    ], Notification.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Notification.prototype, "parent_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Notification_1; }),
        (0, typeorm_1.JoinColumn)({ name: "parent_id" }),
        __metadata("design:type", Notification)
    ], Notification.prototype, "parent_notification", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Notification_1; }, function (noti) { return noti.parent_notification; }),
        __metadata("design:type", Array)
    ], Notification.prototype, "resends", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Notification.prototype, "provider_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return notification_provider_1.NotificationProvider; }),
        (0, typeorm_1.JoinColumn)({ name: "provider_id" }),
        __metadata("design:type", notification_provider_1.NotificationProvider)
    ], Notification.prototype, "provider", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Notification.prototype, "beforeInsert", null);
    Notification = Notification_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], Notification);
    return Notification;
}(base_entity_1.BaseEntity));
exports.Notification = Notification;
/**
 * @schema Notification
 * title: "Notification"
 * description: "Notifications a communications sent via Notification Providers as a reaction to internal events such as `order.placed`. Notifications can be used to show a chronological timeline for communications sent to a Customer regarding an Order, and enables resends."
 * type: object
 * required:
 *   - resource_type
 *   - resource_id
 *   - to
 * properties:
 *   id:
 *     type: string
 *     description: The notification's ID
 *     example: noti_01G53V9Y6CKMCGBM1P0X7C28RX
 *   event_name:
 *     description: "The name of the event that the notification was sent for."
 *     type: string
 *     example: order.placed
 *   resource_type:
 *     description: "The type of resource that the Notification refers to."
 *     type: string
 *     example: order
 *   resource_id:
 *     description: "The ID of the resource that the Notification refers to."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   customer_id:
 *     description: "The ID of the Customer that the Notification was sent to."
 *     type: string
 *     example: cus_01G2SG30J8C85S4A5CHM2S1NS2
 *   customer:
 *     description: A customer object. Available if the relation `customer` is expanded.
 *     type: object
 *   to:
 *     description: "The address that the Notification was sent to. This will usually be an email address, but represent other addresses such as a chat bot user id"
 *     type: string
 *     example: "user@example.com"
 *   data:
 *     description: "The data that the Notification was sent with. This contains all the data necessary for the Notification Provider to initiate a resend."
 *     type: object
 *     example: {}
 *   resends:
 *     description: "The resends that have been completed after the original Notification."
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/NotificationResend"
 *   provider_id:
 *     description: "The id of the Notification Provider that handles the Notification."
 *     type: string
 *     example: sengrid
 *   provider:
 *     description: Available if the relation `provider` is expanded.
 *     $ref: "#/components/schemas/NotificationProvider"
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 */
/**
 * @schema NotificationResend
 * title: "Notification Resend"
 * description: "A resend of a Notification."
 * type: object
 * properties:
 *   id:
 *     description: The notification resend's ID
 *     type: string
 *     example: noti_01F0YET45G9NHP08Z66CE4QKBS
 *   event_name:
 *     description: "The name of the event that the notification was sent for."
 *     type: string
 *     example: order.placed
 *   resource_type:
 *     description: "The type of resource that the Notification refers to."
 *     type: string
 *     example: order
 *   resource_id:
 *     description: "The ID of the resource that the Notification refers to."
 *     type: string
 *     example: order_01G8TJSYT9M6AVS5N4EMNFS1EK
 *   customer_id:
 *     description: "The ID of the Customer that the Notification was sent to."
 *     type: string
 *     example: cus_01G2SG30J8C85S4A5CHM2S1NS2
 *   customer:
 *     description: A customer object. Available if the relation `customer` is expanded.
 *     type: object
 *   to:
 *     description: "The address that the Notification was sent to. This will usually be an email address, but represent other addresses such as a chat bot user id"
 *     type: string
 *     example: "user@example.com"
 *   data:
 *     description: "The data that the Notification was sent with. This contains all the data necessary for the Notification Provider to initiate a resend."
 *     type: object
 *     example: {}
 *   parent_id:
 *     description: "The ID of the Notification that was originally sent."
 *     type: string
 *     example: noti_01G53V9Y6CKMCGBM1P0X7C28RX
 *   parent_notification:
 *     description: Available if the relation `parent_notification` is expanded.
 *     $ref: "#/components/schemas/Notification"
 *   provider_id:
 *     description: "The ID of the Notification Provider that handles the Notification."
 *     type: string
 *     example: sengrid
 *   provider:
 *     description: Available if the relation `provider` is expanded.
 *     $ref: "#/components/schemas/NotificationProvider"
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 */
//# sourceMappingURL=notification.js.map