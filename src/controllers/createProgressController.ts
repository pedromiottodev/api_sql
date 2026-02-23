import { Request, Response } from "express"
import { z } from "zod"
import { CreateProgressService } from "../services/createProgressService"

const ProgressValidator = z.object({
    user_id: z.uuid(),
    course_id: z.uuid(),
    percentual: z.number("O valor deve ser um número inteiro")
        .int("O valor deve ser um número inteiro")
        .min(0, "Informe um valor entre 0 e 100")
        .max(100, "Informe um valor entre 0 e 100")
})

export class CreateProgressController {
    async handle(req: Request, res: Response) {
        const parsed = ProgressValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const createProgressService = new CreateProgressService()

        const result = await createProgressService.execute(parsed.data)

        return res.status(201).json(result)
    }
}