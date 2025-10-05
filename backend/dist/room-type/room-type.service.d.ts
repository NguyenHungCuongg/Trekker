import { Repository } from "typeorm";
import { RoomType } from "./room-type.entity";
export declare class RoomTypeService {
    private roomTypeRepository;
    constructor(roomTypeRepository: Repository<RoomType>);
    findAll(): Promise<RoomType[]>;
    findOne(id: number): Promise<RoomType>;
    findByAccommodationId(accommodationId: number): Promise<RoomType[]>;
    count(): Promise<number>;
}
