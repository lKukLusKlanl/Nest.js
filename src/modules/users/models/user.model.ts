import { Column, Model, Table, HasMany } from "sequelize-typescript";
import { Watchlist } from "src/modules/watchlist/models/watchlist.model";

@Table
export class User extends Model {
    @Column
    firstname: string

    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @HasMany( () => Watchlist , {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    watchlist: Watchlist[]
}