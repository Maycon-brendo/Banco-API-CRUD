import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { conectarServidorNoBD } from './config/db';
import { routerUsuario } from './route/usuario';
import { routerTransactions } from './route/transactions';

/**
 * Cria a aplicação
 */
export const app = express();

/**
 * Libera o acesso aos serviços
 */
app.use(cors());

/**
 * Permite receber e enviar JSON
 */
app.use(bodyParser.json());

/**
 * Configura os logs
 */
app.use(logger('dev'));


/**
 * Conecta no BD
 */
conectarServidorNoBD();

/**
 * Configuração de rotas
 */

app.use('/usuario', routerUsuario);
app.use('/transactions', routerTransactions);
app.use('/', (req, res) => res.send('Banco API'));

