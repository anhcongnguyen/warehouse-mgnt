// src/modules/property/room.module.ts
import { Module } from '@nestjs/common';
import { RoomController } from './api/room.controller';
import { CreateRoomUseCase } from './application/create-room.usecase';
import { TenantContextModule } from 'src/shared/tenant-context/tenant-context.module';
import { SqlRoomRepository } from './infrastructure/persistence/room.repository';

@Module({
  imports: [TenantContextModule], // Import để dùng được TenantContextService
  controllers: [RoomController],
  providers: [
    CreateRoomUseCase,
    // Đăng ký Repository dưới dạng Interface
    {
      provide: 'IRoomRepository', 
      useClass: SqlRoomRepository,
    },
  ],
  // Export UseCase nếu module khác (như Invoicing) cần dùng
  exports: [CreateRoomUseCase],
})
export class RoomModule {}