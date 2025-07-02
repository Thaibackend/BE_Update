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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentsController = void 0;
const common_1 = require("@nestjs/common");
const residents_service_1 = require("./residents.service");
const create_resident_dto_1 = require("./dto/create-resident.dto");
const update_resident_dto_1 = require("./dto/update-resident.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
let ResidentsController = class ResidentsController {
    residentsService;
    constructor(residentsService) {
        this.residentsService = residentsService;
    }
    create(createResidentDto) {
        return this.residentsService.create(createResidentDto);
    }
    findAll() {
        return this.residentsService.findAll();
    }
    findOne(id) {
        return this.residentsService.findOne(id);
    }
    update(id, updateResidentDto) {
        return this.residentsService.update(id, updateResidentDto);
    }
    remove(id) {
        return this.residentsService.remove(id);
    }
};
exports.ResidentsController = ResidentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new resident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The resident has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resident_dto_1.CreateResidentDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Get all residents' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.STAFF, user_schema_1.UserRole.FAMILY),
    (0, swagger_1.ApiOperation)({ summary: 'Get a resident by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Update a resident' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_resident_dto_1.UpdateResidentDto]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a resident' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResidentsController.prototype, "remove", null);
exports.ResidentsController = ResidentsController = __decorate([
    (0, swagger_1.ApiTags)('residents'),
    (0, common_1.Controller)('residents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [residents_service_1.ResidentsService])
], ResidentsController);
//# sourceMappingURL=residents.controller.js.map