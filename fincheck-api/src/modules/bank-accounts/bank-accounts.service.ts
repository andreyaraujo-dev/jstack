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

  async findOneByUserId(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    return this.bankAccountRepository.findFirst({
      where: { userId, id: bankAccountId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    const { type, initialBalance, color, name } = updateBankAccountDto;
    return this.bankAccountRepository.update({
      where: { id: bankAccountId },
      data: {
        type,
        initialBalance,
        color,
        name,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    await this.bankAccountRepository.delete({
      where: { id: bankAccountId },
    });
  }

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ) {
    const isOwner = await this.bankAccountRepository.findFirst({
      where: { userId, id: bankAccountId },
    });
    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
