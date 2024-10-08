import { IsEmail, Length } from "class-validator";

export class UserInput {
  @IsEmail()
  email!: string;

  @Length(7, 12)
  phone!: string;

  @Length(6, 12)
  password!: string;
}

export class LoginInput {
  @IsEmail()
  email!: string;

  @Length(6, 12)
  password!: string;
}
