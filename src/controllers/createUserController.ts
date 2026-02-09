import { Request, Response } from "express"
import { z } from "zod"
import { CreateUserService } from "../services/createUserService"


const UserValidator = z.object({
    name: z.string("O nome precisa ser uma string").min(1, "O nome não pode ser vazio")
})

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const parsed = UserValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const createUserService = new CreateUserService()

        const result = await createUserService.execute(parsed.data)

        return res.status(201).json(result)
    }
}