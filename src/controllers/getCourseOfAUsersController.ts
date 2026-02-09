import { Request, Response } from "express"
import { z } from "zod"
import { GetCourseOfAUserService } from "../services/getCourseOfAUserService"

const UserValidator = z.uuid()

export class GetCourseOfAUserController {
    async handle(req: Request, res: Response) {
        const parsed = UserValidator.safeParse(req.params.user_id)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const getCourseOfAUserService = new GetCourseOfAUserService()

        const result = await getCourseOfAUserService.execute(parsed.data)

        return res.status(200).json(result)
    }
}