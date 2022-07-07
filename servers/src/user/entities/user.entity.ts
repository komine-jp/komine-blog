import { Entity, Column } from 'typeorm'
import { Base } from './base.entity'
@Entity()
export class User extends Base {
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    phone: string;
    @Column()
    role: string;
}