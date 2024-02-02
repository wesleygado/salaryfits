import { Expose } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class RefreshTokenDto {
  @Expose({ name: 'refresh_token' })
  @IsNotEmpty({ message: 'refresh token é obrigatório' })
  @Length(163,163, { message: 'Token Inválido'})
  refreshToken: string;
}
