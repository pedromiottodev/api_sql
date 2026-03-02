import { pool } from "../db"

//usuários de um curso
export class GetUsersOfACourseService {
    async execute(course_id: string) {

        const sql = `
        SELECT u.name
        FROM registrations AS r
        JOIN courses AS c on r.course_id = c.id
        JOIN users AS u ON r.user_id = u.id
        WHERE r.course_id = $1
        `
        const result = await pool.query(sql, [course_id])

        return result.rows
    }
}