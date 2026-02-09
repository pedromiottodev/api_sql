import { Request, Response } from "express"
import { z } from "zod"
import { CreateRegistrationService } from "../services/createRegistrationService"


const RegistrationValidator = z.object({
    user_id: z.uuid(),
    course_id: z.uuid()
})

export class CreateRegistrationController {
    async handle(req: Request, res: Response) {
        const parsed = RegistrationValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }

        const createRegistrationService = new CreateRegistrationService()

        const result = await createRegistrationService.execute(parsed.data)

        return res.status(201).json(result)
    }
}