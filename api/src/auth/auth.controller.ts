import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService) {}

    @Post('register')
    registerUser(@Body() userObject : RegisterAuthDto){
        return this.authService.register(userObject)
    }

    @Post('login')
    loginUser(@Body() userObjectLogin: LoginAuthDto){
        return this.authService.login(userObjectLogin)
    }
    
      
}
