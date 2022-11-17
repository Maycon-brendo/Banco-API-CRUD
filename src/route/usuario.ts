import { STATUS, Usuario } from '../entity/Usuario';
import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController';
import { AuthController } from '../controller/AuthController';
import { sign } from 'jsonwebtoken';
import { SECRET } from '../config/secret';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço pra salvar um novo usuário
 */
routerUsuario.post('/', async (req, res) => {
    const { username, password } = req.body;
    const usuario = new Usuario(username, password);
    const response = usuario.isValid()
    if(response == STATUS.OK){
        try{
            const usuarioSalvo = await usuarioCtrl.salvar(usuario);
            res.json(usuarioSalvo);
        } catch(error){
            return res.status(500).json({messsage: STATUS.REGISTER_ERROR})
        }
    }else{
        return res.status(400).json({message: response})
    }
        
    
});


/**
 * Serviço para recuperar os transações deste usuário
 */
routerUsuario.get('/transactions/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const transactions = await usuarioCtrl.recuperarTransactionsDoUsuario(idUsuario);
    res.json(transactions);
});

routerUsuario.post('/login', async (req, res) => {
    const { username, password} = req.body

    const usuarioCtrl = new UsuarioController()
    const usuario = await usuarioCtrl.recuperarPorUsername(username)
    if(usuario && usuario.isPasswordCorrect(password)){
        const token = sign({user: username, timestamp: new Date()}, SECRET,{
            expiresIn: '24h'
        })
        res.json({authorized: true, username, token})
    }else{
        return res.status(401).json({message: STATUS.NOT_AUTHORIZED})
    }
})