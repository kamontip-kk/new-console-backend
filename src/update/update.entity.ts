import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UpdateStatus } from "./update-status.enum";

@Entity()
export class Update{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    img: string;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    url: string;

    @Column()
    status: UpdateStatus

    // @ManyToOne((_type) => User, (user) => user.updates , {eager: false})
    // user: User
}