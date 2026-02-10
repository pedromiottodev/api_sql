import { pool } from "../db"

type CreateProgressInput = {
    user_id: string,
    course_id: string,
    percentual: number
}

export class CreateProgressService {
    async execute({ user_id, course_id, percentual }: CreateProgressInput) {

        const verifySQL = `
        SELECT user_id
        FROM registration
        WHERE user_id = $1 AND course_id = $2
        `
        const resultVerify = await pool.query(verifySQL, [user_id, course_id])

        if (resultVerify.rowCount === 0) {
            return { message: "Você não pode realizar o progresso de um curso em que não está matriculado" }
        }

        const sql = `
        INSERT INTO progress (user_id, course_id, percentual)
        VALUES ($1, $2, $3)
        RETURNING user_id, course_id, percentual, created_at
        `
        const result = await pool.query(sql, [user_id, course_id, percentual])

        return result.rows[0]
    }
}