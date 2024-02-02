import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserAuthRequestDto } from './dto/auth-request.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() userDto: UserAuthRequestDto) {
    return this.authService.validateUser(userDto.email, userDto.password);
  }

  @HttpCode(200)
  @Post('refresh')
  async reautenticar(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.reautenticar(refreshTokenDto);
  }
}

