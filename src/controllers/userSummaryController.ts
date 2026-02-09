import { Request, Response } from "express"
import { z } from "zod"
import { UserSummaryService } from "../services/userSummaryService"

const UserValidator = z.uuid()

export class UserSummaryController {
    async handle(req: Request, res: Response) {
        const parsed = UserValidator.safeParse(req.params.user_id)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const userSummaryService = new UserSummaryService()

        const result = await userSummaryService.execute(parsed.data)

        return res.status(200).json(result)
    }
}