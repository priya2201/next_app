import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { User } from "./userSchema";
import { LoginInput, UserInput } from "./userValidator.dto";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const UserInputs = plainToClass(UserInput, req.body);
    console.log(req.body);
    const validationError = await validate(UserInputs, {
      validationError: { target: true },
    });

    if (validationError.length > 0) {
      res.status(400).json({ errors: validationError });
      return;
    }
    const { email, phone, password,confirmPassword } = UserInputs;
    console.log(UserInputs, "ui");
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const result = await User.create({
      email: email,
      password: hashedPassword,
      phone: phone,
      address: req.body.address,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      confirmPassword
    });
    res.status(201).json({ message: "User Created Successfully", result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try{
  const UserInputs = plainToClass(LoginInput, req.body);
  console.log(req.body);
  const validationError = await validate(UserInputs, {
    validationError: { target: true },
  });

  if (validationError.length > 0) {
    res.status(400).json({errors:validationError});
    return;
  }
  const { email, password,rememberMe } = UserInputs;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }


    const validation = await bcrypt.compare(password, isUser.password);
    if (!validation) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
      const signature = await jwt.sign(
        { _id: isUser._id, email: isUser.email },
        "APP_SECRET",
        { expiresIn: rememberMe ? '3d':'1d' }
      );
      res.status(200).json({
        signature,
        email: isUser.email,
      });
    }catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
  
  }
}
 

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Clear the JWT token stored in the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Optionally, return a success message
    res.status(200).json({ message: "Logged out successfully" });
    return;
  } catch (error) {
    {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Logout failed", error: error.message });
      }
      else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
  
    }
  }
};
