import { Request, Response } from "express"
import { z } from "zod"
import { GetProgressByIdService } from "../services/getProgressByIdService"

const GetProgressValidator = z.uuid("user_id inválido")

export class GetProgressByIdController {
    async handle(req: Request, res: Response) {
        const parsed = GetProgressValidator.safeParse(req.params.user_id)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const getProgressByIdService = new GetProgressByIdService()

        const result = await getProgressByIdService.execute(parsed.data)

        return res.status(200).json(result)
    }
}