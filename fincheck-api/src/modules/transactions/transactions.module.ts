import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';

@Module({
  imports: [BankAccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateCategoryOwnershipService],
  exports: [ValidateCategoryOwnershipService],
})
export class TransactionsModule {}
