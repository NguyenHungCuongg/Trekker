import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoomType } from "./room-type.entity";

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}

  async findAll(): Promise<RoomType[]> {
    return this.roomTypeRepository.find({
      relations: ["accommodation"],
    });
  }

  async findOne(id: number): Promise<RoomType> {
    const roomType = await this.roomTypeRepository.findOne({
      where: { id },
      relations: ["accommodation"],
    });

    if (!roomType) {
      throw new NotFoundException(`Không tìm thấy room type với id ${id}`);
    }
    return roomType;
  }

  async findByAccommodationId(accommodationId: number): Promise<RoomType[]> {
    return this.roomTypeRepository.find({
      where: { accommodationId },
      relations: ["accommodation"],
    });
  }

  async count(): Promise<number> {
    return this.roomTypeRepository.count();
  }
}
