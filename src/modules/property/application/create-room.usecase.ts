// src/modules/property/application/create-room.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import { TenantContextService } from 'src/shared/tenant-context/tenant-context.service';
import type { IRoomRepository } from '../domain/room.repository';
import { Room } from '../domain/room.entity';

@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject('IRoomRepository') private readonly roomRepo: IRoomRepository,
    private readonly tenantContext: TenantContextService
  ) {}

  async execute(dto: { roomNumber: string; price: number }) {
    const tenantId = this.tenantContext.getTenantId();
    
    const newRoom = new Room(
      crypto.randomUUID(),
      tenantId,
      dto.roomNumber,
      dto.price,
      'AVAILABLE'
    );

    return await this.roomRepo.save(newRoom);
  }
}