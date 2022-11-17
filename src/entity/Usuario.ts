import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { Transactions } from "./Transactions";
import { randomBytes, pbkdf2Sync } from "crypto";

export enum STATUS {
    INVALID_USERNAME = 'nome já em uso ou menor que 3 digitos',
    INVALID_PASSWORD = 'a senha não cumpre os requisitos',
    REGISTER_ERROR= 'Error enquanto tentava registrar usuario',
    NOT_AUTHORIZED='Não autorizado',
    OK = "OK"
}

@Entity()
export class Usuario {

    static collection: any;
    static findOne(arg0: { username: any; }) {
        throw new Error('Method not implemented.');
    }

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    salt: string;

    @Column()
    hash: string;

    @Column()
    password: string;

    isValid(): STATUS {

        if (!this.username || this.username.length < 2) {
            return STATUS.INVALID_USERNAME
        }

        if (!this._isPasswordValid()) {
            return STATUS.INVALID_PASSWORD
        }

        return STATUS.OK
    }

    isPasswordCorrect(password: string): boolean{
        const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
        return hash == this.hash
    }

    private _generatePasswordHash(){
        if(this._isPasswordValid()){
            const salt = randomBytes(16).toString('hex')
            const hash = pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex')
            this.salt = salt
            this.hash = hash
        }
    }

    private _isPasswordValid():boolean{
        return this.password
        && this.password.length >=8
        && /[A-Z]/g.test(this.password)
        && /[0-9]/g.test(this.password)
        
    }

    @OneToOne(() => Accounts)
    accounts: Accounts;

    @OneToMany(() => Transactions, transaction => transaction.usuario)
    transactions: Transactions[];
}
