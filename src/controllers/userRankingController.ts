import { Request, Response } from "express"
import { UserRankingService } from "../services/userRankingService"

export class UserRankingController {
    async handle(req: Request, res: Response) {
        const userRankingService = new UserRankingService()

        const result = await userRankingService.execute()

        return res.status(200).json(result)
    }
}