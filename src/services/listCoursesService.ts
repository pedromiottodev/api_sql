import { pool } from "../db"

export class ListCoursesService {
    async execute() {
        const sql = `
        SELECT *
        FROM course
        ORDER BY name asc
        `
        const result = await pool.query(sql)

        return result.rows
    }
}