import { UUID } from "node:crypto"
import { pool } from "../db"

type CreateProgressInput = {
    user_id: string,
    course_id: string,
    registration_id: string,
    percentage: number
}

export class UpdateProgressService {
    async execute({ user_id, course_id, registration_id, percentage }: CreateProgressInput) {

        const verifySQL = `
        SELECT id
        FROM registrations
        WHERE user_id = $1 AND course_id = $2
        `
        const resultVerify = await pool.query(verifySQL, [user_id, course_id])

        if (resultVerify.rowCount === 0) {
            return { message: "Você não pode alterar o progresso de um curso em que não está matriculado" }
        }

        const sql = `
        UPDATE progress
        SET percentage = $1
        WHERE registration_id = $2
        RETURNING percentage, registration_id
        `
        const result = await pool.query(sql, [percentage, registration_id])

        return result.rows[0]
    }
}