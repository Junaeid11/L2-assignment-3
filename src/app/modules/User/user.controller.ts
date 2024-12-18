import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try{
        const result = await userService.createUserIntoDb(req.body);
         res.status(201).json({
            message: "User created successfully",
            data: result
        })

    }
    catch(error){
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    }
}

export const UserController ={
    createUser,
}