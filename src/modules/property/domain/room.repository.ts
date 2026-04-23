import { Room } from "./room.entity";

// Interface định nghĩa bản thiết kế cho Repository
export interface IRoomRepository {
  save(room: Room): Promise<void>;
  findAll(): Promise<Room[]>;
}