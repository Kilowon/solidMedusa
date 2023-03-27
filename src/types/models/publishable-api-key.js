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
exports.PublishableApiKey = void 0;
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
var db_aware_column_1 = require("../utils/db-aware-column");
var utils_1 = require("../utils");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var publishable_api_keys_1 = __importDefault(require("../loaders/feature-flags/publishable-api-keys"));
var PublishableApiKey = /** @class */ (function (_super) {
    __extends(PublishableApiKey, _super);
    function PublishableApiKey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PublishableApiKey.prototype.beforeInsert = function () {
        this.id = (0, utils_1.generateEntityId)(this.id, "pk");
    };
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], PublishableApiKey.prototype, "created_by", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], PublishableApiKey.prototype, "revoked_by", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], PublishableApiKey.prototype, "revoked_at", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PublishableApiKey.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PublishableApiKey.prototype, "beforeInsert", null);
    PublishableApiKey = __decorate([
        (0, feature_flag_decorators_1.FeatureFlagEntity)(publishable_api_keys_1.default.key)
    ], PublishableApiKey);
    return PublishableApiKey;
}(interfaces_1.BaseEntity));
exports.PublishableApiKey = PublishableApiKey;
/**
 * @schema PublishableApiKey
 * title: "Publishable API key"
 * description: "Publishable API key defines scopes (i.e. resources) that are available within a request."
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The key's ID
 *     example: pk_01G1G5V27GYX4QXNARRQCW1N8T
 *   created_by:
 *    type: string
 *    description: "The unique identifier of the user that created the key."
 *    example: usr_01G1G5V26F5TB3GPAPNJ8X1S3V
 *   created_by_user:
 *    description: A user object. Available if the relation `created_by_user` is expanded.
 *    type: object
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   revoked_by:
 *     type: string
 *     description: "The unique identifier of the user that revoked the key."
 *     example: usr_01G1G5V26F5TB3GPAPNJ8X1S3V
 *   revoked_by_user:
 *     description: A user object. Available if the relation `revoked_by_user` is expanded.
 *     type: object
 *   revoked_at:
 *     type: string
 *     description: "The date with timezone at which the key was revoked."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 */
//# sourceMappingURL=publishable-api-key.js.map