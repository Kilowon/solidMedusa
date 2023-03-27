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
exports.IdempotencyKey = void 0;
var typeorm_1 = require("typeorm");
var db_aware_column_1 = require("../utils/db-aware-column");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var IdempotencyKey = /** @class */ (function () {
    function IdempotencyKey() {
    }
    IdempotencyKey.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "ikey");
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], IdempotencyKey.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Index)({ unique: true }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], IdempotencyKey.prototype, "idempotency_key", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz") }),
        __metadata("design:type", Date)
    ], IdempotencyKey.prototype, "created_at", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "timestamptz", nullable: true }),
        __metadata("design:type", Date)
    ], IdempotencyKey.prototype, "locked_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], IdempotencyKey.prototype, "request_method", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], IdempotencyKey.prototype, "request_params", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], IdempotencyKey.prototype, "request_path", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true }),
        __metadata("design:type", Number)
    ], IdempotencyKey.prototype, "response_code", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], IdempotencyKey.prototype, "response_body", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "started" }),
        __metadata("design:type", String)
    ], IdempotencyKey.prototype, "recovery_point", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IdempotencyKey.prototype, "beforeInsert", null);
    IdempotencyKey = __decorate([
        (0, typeorm_1.Entity)()
    ], IdempotencyKey);
    return IdempotencyKey;
}());
exports.IdempotencyKey = IdempotencyKey;
/**
 * @schema IdempotencyKey
 * title: "Idempotency Key"
 * description: "Idempotency Key is used to continue a process in case of any failure that might occur."
 * type: object
 * required:
 *   - idempotency_key
 * properties:
 *   id:
 *     type: string
 *     description: The idempotency key's ID
 *     example: ikey_01G8X9A7ESKAJXG2H0E6F1MW7A
 *   idempotency_key:
 *     description: "The unique randomly generated key used to determine the state of a process."
 *     type: string
 *     externalDocs:
 *       url: https://docs.medusajs.com/advanced/backend/payment/overview#idempotency-key
 *       description: Learn more how to use the idempotency key.
 *   created_at:
 *     description: Date which the idempotency key was locked.
 *     type: string
 *     format: date-time
 *   locked_at:
 *     description: Date which the idempotency key was locked.
 *     type: string
 *     format: date-time
 *   request_method:
 *     description: "The method of the request"
 *     type: string
 *     example: POST
 *   request_params:
 *     type: object
 *     description: "The parameters passed to the request"
 *     example:
 *       id: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   request_path:
 *     description: "The request's path"
 *     type: string
 *     example: /store/carts/cart_01G8ZH853Y6TFXWPG5EYE81X63/complete
 *   response_code:
 *     type: string
 *     description: "The response's code."
 *     example: 200
 *   response_body:
 *     type: object
 *     description: "The response's body"
 *     example:
 *       id: cart_01G8ZH853Y6TFXWPG5EYE81X63
 *   recovery_point:
 *     type: string
 *     description: "Where to continue from."
 *     default: started
 */
//# sourceMappingURL=idempotency-key.js.map