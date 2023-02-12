import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { createUserDTO } from '../users/dto';
import { AuthService } from './auth.service';
import { UserloginDTO } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @ApiTags('API')
    @ApiResponse({ status: 201, type: createUserDTO })
    @Post('register')
    register(@Body() dto: createUserDTO): Promise<createUserDTO> {
        return this.authService.registerUser(dto)
    }
    @ApiTags('API')
    @ApiResponse({ status: 200, type: AuthUserResponse })
    @Post('login')
    login(@Body() dto: UserloginDTO): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto)
    }
    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true
    }
}