import { pool } from "../db"

export class UserRankingService {
    async execute() {

        const sql = `
        SELECT u.id, u.name, COALESCE(AVG(p.percentage), 0) AS progress_media
        FROM registrations AS r
        JOIN progress AS p on r.id = p.registration_id
        JOIN users AS u on r.user_id = u.id
        GROUP BY u.id, u.name
        `
        const result = await pool.query(sql)

        return result.rows
    }
}