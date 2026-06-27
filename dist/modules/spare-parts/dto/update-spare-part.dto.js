"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSparePartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_spare_part_dto_1 = require("./create-spare-part.dto");
class UpdateSparePartDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_spare_part_dto_1.CreateSparePartDto, ['quantity'])) {
}
exports.UpdateSparePartDto = UpdateSparePartDto;
//# sourceMappingURL=update-spare-part.dto.js.map