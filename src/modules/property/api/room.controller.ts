// src/modules/property/interface/room.controller.ts
import { Controller, Post, Get, Body, UseInterceptors, Inject } from '@nestjs/common';
import { CreateRoomUseCase } from '../application/create-room.usecase';
import { TenantInterceptor } from 'src/shared/tenant-context/tenant.interceptor';
import { IRoomRepository } from '../domain/room.entity';

@Controller('rooms')
@UseInterceptors(TenantInterceptor)
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    
    // 2. Sử dụng @Inject với đúng Token đã khai báo trong room.module.ts
    @Inject('IRoomRepository') 
    private readonly roomRepo: IRoomRepository 
  ) {}

  @Post()
  async create(@Body() body: any) {
    return await this.createRoomUseCase.execute(body);
  }

  @Get()
  async getAll() {
    return await this.roomRepo.findAll();
  }
}