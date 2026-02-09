import { pool } from "../db"

export class UserRankingService {
    async execute() {

        const sql = `
        SELECT u.id, u.name, AVG(percentual) as progress_media
        FROM progress as p
        JOIN users as u on p.user_id = u.id
        GROUP BY u.id, u.name
        ORDER BY progress_media DESC
        `
        const result = await pool.query(sql)

        return result.rows
    }
}

