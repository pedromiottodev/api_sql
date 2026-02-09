import { Request, Response } from "express"
import { z } from "zod"
import { GetUsersOfACourseService } from "../services/getUsersOfACourseService"

const CourseValidator = z.uuid()

export class GetUsersOfACourseController {
    async handle(req: Request, res: Response) {
        const parsed = CourseValidator.safeParse(req.params.course_id)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const getUsersOfACourseService = new GetUsersOfACourseService()

        const result = await getUsersOfACourseService.execute(parsed.data)

        return res.status(200).json(result)
    }
}