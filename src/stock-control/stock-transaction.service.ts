import { Injectable } from '@nestjs/common';
@Injectable()
export class StockTransactionService {
  create(createStockControlDto) {
    return 'This action adds a new stockControl';
  }

  findAll() {
    return `This action returns all stockControl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockControl`;
  }

  update(id: number, updateStockControlDto) {
    return `This action updates a #${id} stockControl`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockControl`;
  }
}
