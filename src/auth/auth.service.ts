import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await bcrypt.compare(password, user.password)) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException();
  }

  async gerarToken(payload: User) {
    const accessToken = this.jwtService.sign(
      { email: payload.email },
      { secret: process.env.SECRET, expiresIn: '120s' },
    );

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      { secret: process.env.REFRESH, expiresIn: '240s' },
    );

    return { token: accessToken, refresh_token: refreshToken };
  }

  async reautenticar(body: RefreshTokenDto) {
    const payload: User = await this.verificarRefreshToken(body);
    return this.gerarToken(payload);
  }

  private async verificarRefreshToken(
    body: RefreshTokenDto,
  ): Promise<User> {
    const refreshToken = body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH,
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}