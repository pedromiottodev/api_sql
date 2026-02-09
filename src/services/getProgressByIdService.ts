import { pool } from "../db"

export class GetProgressByIdService {
    async execute(user_id: string) {
        const sql = `
        SELECT *
        FROM progress
        WHERE user_id = $1
        `
        const result = await pool.query(sql, [user_id])

        return result.rows
    }
}