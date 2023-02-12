import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import {User} from "../../users/models/user.model"

@Table
export class Watchlist extends Model{

    @ForeignKey(()=> User)
    User:User
 
    @Column
    name: string

    @Column
    assetId: string
}