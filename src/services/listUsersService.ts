import { pool } from "../db"

export class ListUsersService {
    async execute() {
        const sql = `
        SELECT *
        FROM users
        ORDER BY name asc
        `
        const result = await pool.query(sql)

        return result.rows
    }
}