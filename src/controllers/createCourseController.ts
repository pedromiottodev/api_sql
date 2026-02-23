import { Request, Response } from "express"
import { z } from "zod"
import { CreateCourseService } from "../services/createCourseService"

const CourseValidator = z.object({
    name: z.string("O nome do curso precisa ser uma string").min(1, "O nome do curso não pode ser vazio")
})

export class CreateCourseController {
    async handle(req: Request, res: Response) {
        const parsed = CourseValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const createCourseService = new CreateCourseService()

        const result = await createCourseService.execute(parsed.data)

        return res.status(201).json(result)
    }
}