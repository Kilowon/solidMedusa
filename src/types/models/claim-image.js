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
exports.ClaimImage = void 0;
var typeorm_1 = require("typeorm");
var claim_item_1 = require("./claim-item");
var db_aware_column_1 = require("../utils/db-aware-column");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var ClaimImage = /** @class */ (function (_super) {
    __extends(ClaimImage, _super);
    function ClaimImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClaimImage.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "cimg");
    };
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ClaimImage.prototype, "claim_item_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return claim_item_1.ClaimItem; }, function (ci) { return ci.images; }),
        (0, typeorm_1.JoinColumn)({ name: "claim_item_id" }),
        __metadata("design:type", claim_item_1.ClaimItem)
    ], ClaimImage.prototype, "claim_item", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ClaimImage.prototype, "url", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], ClaimImage.prototype, "metadata", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ClaimImage.prototype, "beforeInsert", null);
    ClaimImage = __decorate([
        (0, typeorm_1.Entity)()
    ], ClaimImage);
    return ClaimImage;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.ClaimImage = ClaimImage;
/**
 * @schema ClaimImage
 * title: "Claim Image"
 * description: "Represents photo documentation of a claim."
 * type: object
 * required:
 *  - claim_item_id
 *  - url
 * properties:
 *   id:
 *     type: string
 *     description: The claim image's ID
 *     example: cimg_01G8ZH853Y6TFXWPG5EYE81X63
 *   claim_item_id:
 *     type: string
 *     description: The ID of the claim item associated with the image
 *   claim_item:
 *     description: A claim item object. Available if the relation `claim_item` is expanded.
 *     type: object
 *   url:
 *     type: string
 *     description: The URL of the image
 *     format: uri
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
//# sourceMappingURL=claim-image.js.map