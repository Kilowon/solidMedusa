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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishableApiKeySalesChannel = void 0;
var typeorm_1 = require("typeorm");
var feature_flag_decorators_1 = require("../utils/feature-flag-decorators");
var publishable_api_keys_1 = __importDefault(require("../loaders/feature-flags/publishable-api-keys"));
var PublishableApiKeySalesChannel = /** @class */ (function () {
    function PublishableApiKeySalesChannel() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], PublishableApiKeySalesChannel.prototype, "sales_channel_id", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], PublishableApiKeySalesChannel.prototype, "publishable_key_id", void 0);
    PublishableApiKeySalesChannel = __decorate([
        (0, feature_flag_decorators_1.FeatureFlagEntity)(publishable_api_keys_1.default.key)
    ], PublishableApiKeySalesChannel);
    return PublishableApiKeySalesChannel;
}());
exports.PublishableApiKeySalesChannel = PublishableApiKeySalesChannel;
/**
 * @schema PublishableApiKeySalesChannel
 * title: "Publishable API key sales channel"
 * description: "Holds mapping between Publishable API keys and Sales Channels"
 * type: object
 * properties:
 *   sales_channel_id:
 *     type: string
 *     description: The sales channel's ID
 *     example: sc_01G1G5V21KADXNGH29BJMAJ4B4
 *   publishable_key_id:
 *     type: string
 *     description: The publishable API key's ID
 *     example: pak_01G1G5V21KADXNGH29BJMAJ4B4
 */
//# sourceMappingURL=publishable-api-key-sales-channel.js.map