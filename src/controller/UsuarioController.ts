import { getManager } from "typeorm";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

    async salvar(usuario: Usuario) {
        delete usuario.password
        try{
            const usuarioSalvo = await getManager().save(usuario);
            return usuarioSalvo;
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
        
    }

    async recuperarPorId(id: number) {
        const usuario = await getManager().findOne(Usuario, id);
        return usuario;
    }

    async recuperarPorUsername(username: string): Promise<Usuario> {
        const usuario = await getManager().findOne(Usuario, {username: username});
        return usuario;
    }

    async recuperarTransactionsDoUsuario(id: number) {
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ['transactions']
        });
        return usuario.transactions;
    }
}