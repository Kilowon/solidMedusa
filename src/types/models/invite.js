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
exports.Invite = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var user_1 = require("./user");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var Invite = /** @class */ (function (_super) {
    __extends(Invite, _super);
    function Invite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Invite.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "invite");
    };
    __decorate([
        (0, typeorm_1.Index)({ unique: true, where: "deleted_at IS NULL" }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Invite.prototype, "user_email", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({
            type: "enum",
            enum: user_1.UserRoles,
            nullable: true,
            default: user_1.UserRoles.MEMBER,
        }),
        __metadata("design:type", String)
    ], Invite.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Invite.prototype, "accepted", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Invite.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], Invite.prototype, "expires_at", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Invite.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Invite.prototype, "beforeInsert", null);
    Invite = __decorate([
        (0, typeorm_1.Entity)()
    ], Invite);
    return Invite;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.Invite = Invite;
/**
 * @schema Invite
 * title: "Invite"
 * description: "Represents an invite"
 * type: object
 * required:
 *   - user_email
 * properties:
 *   id:
 *     type: string
 *     description: The invite's ID
 *     example: invite_01G8TKE4XYCTHSCK2GDEP47RE1
 *   user_email:
 *     type: string
 *     description: The email of the user being invited.
 *     format: email
 *   role:
 *     type: string
 *     description: The user's role.
 *     enum:
 *       - admin
 *       - member
 *       - developer
 *     default: member
 *   accepted:
 *     type: boolean
 *     description: Whether the invite was accepted or not.
 *     example: false
 *   token:
 *     type: string
 *     description: The token used to accept the invite.
 *   expores_at:
 *     type: string
 *     description: The date the invite expires at.
 *     format: date-time
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
//# sourceMappingURL=invite.js.map