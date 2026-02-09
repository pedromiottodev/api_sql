import { pool } from "../db"

//cursos de um usuário
export class GetCourseOfAUserService {
    async execute(user_id: string) {

        const sql = `
        SELECT u.name as user_name, 
        c.name as course_name
        FROM registration as r
        JOIN users as u on r.user_id = u.id
        JOIN course as c on r.course_id = c.id
        WHERE r.user_id = $1
        `
        const result = await pool.query(sql, [user_id])

        return result.rows
    }
}