// src/modules/property/domain/room.entity.ts
export class Room {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public roomNumber: string,
    public basePrice: number,
    public status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE',
  ) {}

  // Logic nghiệp vụ: Ví dụ không cho phép đặt giá phòng âm
  updatePrice(newPrice: number) {
    if (newPrice < 0) throw new Error('Giá phòng không được nhỏ hơn 0');
    this.basePrice = newPrice;
  }
}
