// src/modules/property/infrastructure/persistence/room.repository.ts
import { Injectable } from '@nestjs/common';
import { TenantContextService } from 'src/shared/tenant-context/tenant-context.service';
import { Room } from '../../domain/room.entity';
import { IRoomRepository } from '../../domain/room.repository';

@Injectable()
export class SqlRoomRepository implements IRoomRepository {
  constructor(
    private readonly db: DatabaseService, // Giả sử bạn dùng Prisma/TypeORM
    private readonly tenantContext: TenantContextService
  ) {}

  async findAll(): Promise<Room[]> {
    const tenantId = this.tenantContext.getTenantId(); // Lấy ngầm từ Context

    // Luôn luôn lọc theo tenantId ở tầng thấp nhất
    return this.db.room.findMany({
      where: { tenantId: tenantId }
    });
  }

  async save(room: Room): Promise<void> {
    await this.db.room.create({
      data: { ...room }
    });
  }
}