import { Body, Controller, Delete, Patch, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './users.service';
import { createUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @ApiTags('API')
    @ApiResponse({status:200, type: UpdateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch()
   updateUser(@Body() updateDTO: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO>{
   const user= request.user
   return this.userService.updateUser(user.email, updateDTO)
   }
    @UseGuards(JwtAuthGuard)
   @Delete()
   deleteUser(@Req() request){
    const user= request.user
    return this.userService.deleteUser(user.email)
   }
}
