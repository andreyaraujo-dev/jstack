import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from '../../../shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from './validate-category-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({ where: { userId: userId } });
  }

  findOne(transactionId: string) {
    return `This action returns a #${transactionId} transaction`;
  }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { name, type, bankAccountId, date, value, categoryId } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ categoryId, userId, bankAccountId });

    return this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        type,
        date,
        value,
      },
    });
  }

  update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${transactionId} transaction`;
  }

  remove(transactionId: string) {
    return `This action removes a #${transactionId} transaction`;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
  }: {
    userId: string;
    categoryId: string;
    bankAccountId: string;
  }) {
    await Promise.all([
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
