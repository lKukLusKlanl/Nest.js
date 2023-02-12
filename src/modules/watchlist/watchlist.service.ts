import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private readonly watchListRepository: typeof Watchlist) {}

    async createAsset(user, dto):Promise<CreateAssetResponse>{
        const watchlist = {
            User: user.id,
            name: dto.name,
            assetId: dto.assetId
        }
        await this.watchListRepository.create(watchlist)
        return watchlist
    }
    async deleteAsset(userId: number, assetId: string): Promise<boolean>{
       await  this.watchListRepository.destroy({where: {id: assetId, User: userId}})
       return true
    }
}
