import { RoomTypeService } from "./room-type.service";
import { RoomType } from "./room-type.entity";
export declare class RoomTypeController {
    private roomTypeService;
    constructor(roomTypeService: RoomTypeService);
    findAll(accommodationId?: number): Promise<RoomType[]>;
    findOne(id: number): Promise<RoomType>;
}
