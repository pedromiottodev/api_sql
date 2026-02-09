import { pool } from "../db"

//usuários de um curso
export class GetUsersOfACourseService {
    async execute(course_id: string) {

        const sql = `
        SELECT u.name as user_name, 
        c.name as course_name
        FROM registration as r
        JOIN users as u on r.user_id = u.id
        JOIN course as c on r.course_id = c.id
        WHERE r.course_id = $1
        `
        const result = await pool.query(sql, [course_id])

        return result.rows
    }
}