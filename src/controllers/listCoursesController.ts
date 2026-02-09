import { Request, Response } from "express"
import { ListCoursesService } from "../services/listCoursesService"

export class ListCoursesController {
    async handle(req: Request, res: Response) {
        const listCoursesService = new ListCoursesService()

        const result = await listCoursesService.execute()

        return res.status(200).json(result)
    }
}