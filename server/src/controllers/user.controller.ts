import { Request, Response } from "express";
import * as userService from '../services/userService'



export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser)
    } catch (error) {
        console.error('Error in createUser controller:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};