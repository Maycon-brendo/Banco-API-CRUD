import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Transactions } from "./Transactions";
import { Usuario } from "./Usuario";

@Entity()
export class Accounts {

    constructor(username: string, balance: number) {
        this.username = username;
        this.balance = balance;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ type: 'float' })
    balance: number;

    @OneToOne(() => Usuario, Usuario => Usuario.accounts)
    usuario: Usuario[];
}
