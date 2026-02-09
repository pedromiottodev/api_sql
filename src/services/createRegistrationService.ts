import { pool } from "../db"


type CreateRegistrationInput = {
  user_id: string,
  course_id: string
}

export class CreateRegistrationService {
    async execute({user_id, course_id}: CreateRegistrationInput) {
        const sql = `
        INSERT INTO registration (user_id, course_id)
        VALUES ($1, $2)
        RETURNING user_id, course_id, created_at
        `
        const result = await pool.query(sql, [user_id, course_id])

        return result.rows[0]
    }
}