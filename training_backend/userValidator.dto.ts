import { IsEmail, Length ,IsBoolean} from "class-validator";

export class UserInput {
  @IsEmail()
  email!: string;

  @Length(10)
  phone!: string;

  @Length(6, 12)
  password!: string;

  @Length(6, 12)
  confirmPassword!: string;
}

export class LoginInput {
  @IsEmail()
  email!: string;

  @Length(6, 12)
  password!: string;

  @IsBoolean()
  rememberMe!: boolean;

}
