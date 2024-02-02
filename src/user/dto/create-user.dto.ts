import { IsNotEmpty } from "class-validator";
import { UserRole } from "../entities/user-role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  role: UserRole;
}
