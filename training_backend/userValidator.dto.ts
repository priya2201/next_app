import { IsEmail, Length, IsBoolean, IsNotEmpty } from "class-validator";

export class UserInput {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(10)
  @IsNotEmpty()
  phone!: string;

  @Length(6, 12)
  @IsNotEmpty()
  password!: string;

  @Length(6, 12)
  @IsNotEmpty()
  confirmPassword!: string;
}

export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(6, 12)
  @IsNotEmpty()
  password!: string;

  @IsBoolean()
  rememberMe!: boolean;
}
