import { Update } from "src/update/update.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string

    // @OneToMany((_type) => Update, (update) =>update.user, {eager:true})
    // updates: Update[];
}