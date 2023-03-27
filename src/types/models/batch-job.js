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
exports.BatchJob = void 0;
var typeorm_1 = require("typeorm");
var batch_job_1 = require("../types/batch-job");
var db_aware_column_1 = require("../utils/db-aware-column");
var soft_deletable_entity_1 = require("../interfaces/models/soft-deletable-entity");
var user_1 = require("./user");
var generate_entity_id_1 = require("../utils/generate-entity-id");
var BatchJob = /** @class */ (function (_super) {
    __extends(BatchJob, _super);
    function BatchJob() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dry_run = false;
        return _this;
    }
    BatchJob.prototype.loadStatus = function () {
        var _a;
        /* Always keep the status order consistent. */
        if (this.pre_processed_at) {
            this.status = batch_job_1.BatchJobStatus.PRE_PROCESSED;
        }
        if (this.confirmed_at) {
            this.status = batch_job_1.BatchJobStatus.CONFIRMED;
        }
        if (this.processing_at) {
            this.status = batch_job_1.BatchJobStatus.PROCESSING;
        }
        if (this.completed_at) {
            this.status = batch_job_1.BatchJobStatus.COMPLETED;
        }
        if (this.canceled_at) {
            this.status = batch_job_1.BatchJobStatus.CANCELED;
        }
        if (this.failed_at) {
            this.status = batch_job_1.BatchJobStatus.FAILED;
        }
        this.status = (_a = this.status) !== null && _a !== void 0 ? _a : batch_job_1.BatchJobStatus.CREATED;
    };
    BatchJob.prototype.beforeInsert = function () {
        this.id = (0, generate_entity_id_1.generateEntityId)(this.id, "batch");
    };
    BatchJob.prototype.toJSON = function () {
        this.loadStatus();
        return this;
    };
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "text" }),
        __metadata("design:type", String)
    ], BatchJob.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Object)
    ], BatchJob.prototype, "created_by", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }),
        (0, typeorm_1.JoinColumn)({ name: "created_by" }),
        __metadata("design:type", user_1.User)
    ], BatchJob.prototype, "created_by_user", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], BatchJob.prototype, "context", void 0);
    __decorate([
        (0, db_aware_column_1.DbAwareColumn)({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], BatchJob.prototype, "result", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: false, default: false }),
        __metadata("design:type", Object)
    ], BatchJob.prototype, "dry_run", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], BatchJob.prototype, "pre_processed_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], BatchJob.prototype, "processing_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], BatchJob.prototype, "confirmed_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], BatchJob.prototype, "completed_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], BatchJob.prototype, "canceled_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: (0, db_aware_column_1.resolveDbType)("timestamptz"), nullable: true }),
        __metadata("design:type", Date)
    ], BatchJob.prototype, "failed_at", void 0);
    __decorate([
        (0, typeorm_1.AfterLoad)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BatchJob.prototype, "loadStatus", null);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BatchJob.prototype, "beforeInsert", null);
    BatchJob = __decorate([
        (0, typeorm_1.Entity)()
    ], BatchJob);
    return BatchJob;
}(soft_deletable_entity_1.SoftDeletableEntity));
exports.BatchJob = BatchJob;
/**
 * @schema BatchJob
 * title: "Batch Job"
 * description: "A Batch Job."
 * type: object
 * required:
 *   - type
 * properties:
 *  id:
 *    type: string
 *    description: "The unique identifier for the batch job."
 *    example: batch_01G8T782965PYFG0751G0Z38B4
 *  type:
 *    type: string
 *    description: "The type of batch job."
 *    enum:
 *      - product-import
 *      - product-export
 *  status:
 *    type: string
 *    description: "The status of the batch job."
 *    enum:
 *      - created
 *      - pre_processed
 *      - confirmed
 *      - processing
 *      - completed
 *      - canceled
 *      - failed
 *    default: created
 *  created_by:
 *    type: string
 *    description: "The unique identifier of the user that created the batch job."
 *    example: usr_01G1G5V26F5TB3GPAPNJ8X1S3V
 *  created_by_user:
 *    description: A user object. Available if the relation `created_by_user` is expanded.
 *    type: object
 *  context:
 *    type: object
 *    description: "The context of the batch job, the type of the batch job determines what the context should contain."
 *    example:
 *      shape:
 *        prices:
 *          - region: null
 *            currency_code: "eur"
 *        dynamicImageColumnCount: 4
 *        dynamicOptionColumnCount: 2
 *      list_config:
 *        skip: 0
 *        take: 50
 *        order:
 *          created_at: "DESC"
 *        relations:
 *          - variants
 *          - variant.prices
 *          - images
 *  dry_run:
 *    type: boolean
 *    description: "Specify if the job must apply the modifications or not."
 *    default: false
 *  result:
 *    type: object
 *    description: "The result of the batch job."
 *    properties:
 *      count:
 *        type: number
 *      advancement_count:
 *        type: number
 *      progress:
 *        type: number
 *      errors:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          code:
 *            oneOf:
 *              - type: string
 *              - type: number
 *          err:
 *            type: array
 *      stat_descriptors:
 *        type: object
 *        properties:
 *          key:
 *            type: string
 *          name:
 *            type: string
 *          message:
 *            type: string
 *      file_key:
 *        type: string
 *      file_size:
 *        type: number
 *    example:
 *      errors:
 *        - err: []
 *          code: "unknown"
 *          message: "Method not implemented."
 *      stat_descriptors:
 *        - key: "product-export-count"
 *          name: "Product count to export"
 *          message: "There will be 8 products exported by this action"
 *  pre_processed_at:
 *    type: string
 *    description: "The date from which the job has been pre processed."
 *    format: date-time
 *  processing_at:
 *    type: string
 *    description: "The date the job is processing at."
 *    format: date-time
 *  confirmed_at:
 *    type: string
 *    description: "The date when the confirmation has been done."
 *    format: date-time
 *  completed_at:
 *    type: string
 *    description: "The date of the completion."
 *    format: date-time
 *  canceled_at:
 *    type: string
 *    description: "The date of the concellation."
 *    format: date-time
 *  failed_at:
 *    type: string
 *    description: "The date when the job failed."
 *    format: date-time
 *  created_at:
 *    type: string
 *    description: "The date with timezone at which the resource was created."
 *    format: date-time
 *  updated_at:
 *    type: string
 *    description: "The date with timezone at which the resource was last updated."
 *    format: date-time
 *  deleted_at:
 *    type: string
 *    description: "The date with timezone at which the resource was deleted."
 *    format: date-time
 */
//# sourceMappingURL=batch-job.js.map