
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Base {
    @PrimaryGeneratedColumn()
    id: string;
    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;
}