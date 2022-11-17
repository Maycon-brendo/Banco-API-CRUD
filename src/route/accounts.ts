import { Accounts } from '../entity/Accounts';
import { Router } from 'express';
import { AccountsController } from '../controller/AccountsController';

export const routerAccounts = Router();
const accountsCtrl = new AccountsController();

/**
 * Serviço pra salvar conta
 */
 routerAccounts.post('/', async (req, res) => {
    const { username, balance } = req.body;
    const account = new Accounts(username, balance);
    const accountSalvo = await accountsCtrl.salvar(account);
    res.json(accountSalvo);
});



/**
 * Serviço para recuperar os transações de um determinado usuário
 */
 routerAccounts.get('/transactions/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const transactions = await accountsCtrl.recuperarTransactionsDoUsuario(idUsuario);
    res.json(transactions);
});