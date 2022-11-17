import { getManager } from "typeorm";
import { Accounts } from "../entity/Accounts";
import { Usuario } from "../entity/Usuario";

export class AccountsController {

    async salvar(accounts: Accounts) {
        const accountSalvo = await getManager().save(accounts);
        return accountSalvo;
    }

    async recuperarTodos() {
        const accounts = await getManager().find(Accounts);
        return accounts;
    }

    async recuperarPorId(id: number) {
        const accounts = await getManager().findOne(Accounts, id);
        return accounts;
    }

    async recuperarTransactionsDoUsuario(id: number) {
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ['transactions']
        });
        return usuario.transactions;
    }
}