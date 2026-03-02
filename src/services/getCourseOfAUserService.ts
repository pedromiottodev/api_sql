import { pool } from "../db"

//cursos de um usuário
export class GetCourseOfAUserService {
    async execute(user_id: string) {

        const sql = `
        SELECT COUNT(*) as quantity 
        FROM registrations AS r
        JOIN courses AS c ON r.course_id = c.id
        JOIN users AS u on r.user_id = u.id
        WHERE r.user_id = $1
        `
        const result = await pool.query(sql, [user_id])

        return result.rows
    }
}