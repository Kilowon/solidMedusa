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
exports.SalesChannel = void 0;
var typeorm_1 = require("typeorm");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var interfaces_1 = require("../interfaces");
var utils_1 = require("../utils");
var SalesChannel = /** @class */ (function (_super) {
    __extends(SalesChannel, _super);
    function SalesChannel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SalesChannel.prototype.beforeInsert = function () {
        this.id = (0, utils_1.generateEntityId)(this.id, "sc");
    };
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], SalesChannel.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], SalesChannel.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], SalesChannel.prototype, "is_disabled", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SalesChannel.prototype, "beforeInsert", null);
    SalesChannel = __decorate([
        (0, feature_flag_decorators_1.FeatureFlagEntity)("sales_channels")
    ], SalesChannel);
    return SalesChannel;
}(interfaces_1.SoftDeletableEntity));
exports.SalesChannel = SalesChannel;
/**
 * @schema SalesChannel
 * title: "Sales Channel"
 * description: "A Sales Channel"
 * type: object
 * required:
 *   - name
 * properties:
 *  id:
 *    type: string
 *    description: The sales channel's ID
 *    example: sc_01G8X9A7ESKAJXG2H0E6F1MW7A
 *  name:
 *    description: "The name of the sales channel."
 *    type: string
 *    example: Market
 *  description:
 *    description: "The description of the sales channel."
 *    type: string
 *    example: Multi-vendor market
 *  is_disabled:
 *    description: "Specify if the sales channel is enabled or disabled."
 *    type: boolean
 *    default: false
 *  created_at:
 *    type: string
 *    description: "The date with timezone at which the resource was created."
 *    format: date-time
 *  updated_at:
 *    type: string
 *    description: "The date with timezone at which the resource was updated."
 *    format: date-time
 *  deleted_at:
 *    type: string
 *    description: "The date with timezone at which the resource was deleted."
 *    format: date-time
 */
//# sourceMappingURL=sales-channel.js.map