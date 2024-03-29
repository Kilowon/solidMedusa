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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentProvider = void 0;
var typeorm_1 = require("typeorm");
var FulfillmentProvider = /** @class */ (function () {
    function FulfillmentProvider() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], FulfillmentProvider.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], FulfillmentProvider.prototype, "is_installed", void 0);
    FulfillmentProvider = __decorate([
        (0, typeorm_1.Entity)()
    ], FulfillmentProvider);
    return FulfillmentProvider;
}());
exports.FulfillmentProvider = FulfillmentProvider;
/**
 * @schema FulfillmentProvider
 * title: "Fulfillment Provider"
 * description: "Represents a fulfillment provider plugin and holds its installation status."
 * type: object
 * properties:
 *   id:
 *     description: "The id of the fulfillment provider as given by the plugin."
 *     type: string
 *     example: manual
 *   is_installed:
 *     description: "Whether the plugin is installed in the current version. Plugins that are no longer installed are not deleted by will have this field set to `false`."
 *     type: boolean
 *     example: true
 */
//# sourceMappingURL=fulfillment-provider.js.map