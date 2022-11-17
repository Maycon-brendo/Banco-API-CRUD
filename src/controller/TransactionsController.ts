import { getManager } from 'typeorm';
import { Transactions } from "../entity/Transactions";

export class TransactionsController {

    async salvar(transactions: Transactions) {
        const transactionsSalvo = await getManager().save(transactions);
        return transactionsSalvo;
    }
}