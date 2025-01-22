import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../shared/database/repositories/bank-accounts.repository';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountRepository: BankAccountsRepository) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, color, type } = createBankAccountDto;

    return this.bankAccountRepository.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountRepository.findMany({ where: { userId } });
  }

  async findOneByUserId(userId: string, id: string) {
    const bankAccount = await this.bankAccountRepository.findUnique({
      where: { userId, id },
    });
    if (!bankAccount) {
      throw new NotFoundException('Bank account does not exist');
    }

    return bankAccount;
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
