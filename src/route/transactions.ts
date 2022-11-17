import { UsuarioController } from '../controller/UsuarioController';
import { TransactionsController } from '../controller/TransactionsController';
import { Router } from 'express';
import { Transactions } from '../entity/Transactions';

export const routerTransactions = Router();
const TransactionsCtrl = new TransactionsController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */
routerTransactions.post('/', async (req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const transactions = new Transactions(valor, descricao, data, usuario);
        const transactionsSalvo = await TransactionsCtrl.salvar(transactions);
        res.json(transactionsSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }
});
