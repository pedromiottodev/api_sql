import { pool } from "../db"

export class GetProgressByIdService {
    async execute(user_id: string) {
        const sql = `
        SELECT percentage
        FROM progress
        JOIN registrations on progress.registration_id = registrations.id
        WHERE registrations.user_id = $1
        `
        const result = await pool.query(sql, [user_id])

        return result.rows
    }
}