import { Body, Controller,Post, Req, UseGuards, Get, Patch,Delete, Query} from '@nestjs/common';
import { WatchListDTO } from './dto';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
    constructor( private readonly watchlistSercice: WatchlistService){}
    @ApiTags('API')
    @ApiResponse({status: 201, type:CreateAssetResponse })
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset (@Body() assetDTO: WatchListDTO, @Req() request):Promise<CreateAssetResponse>{
        const user= request.user
        return this.watchlistSercice.createAsset(user, assetDTO)
    }
    @ApiTags('API')
    @ApiResponse({status: 200})
   @UseGuards(JwtAuthGuard)
   @Delete()
   deleteAsset(@Query('id') assetId:string, @Req() request): Promise<boolean>{
    //const user= request.user
    const {id}= request.user    
    return this.watchlistSercice.deleteAsset(id, assetId)
   }
}
