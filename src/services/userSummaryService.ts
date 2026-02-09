import { pool } from "../db"

export class UserSummaryService {
    async execute(user_id: string) {

        const total_courses = await pool.query('SELECT COUNT(user_id) AS total FROM registration WHERE user_id = $1', [user_id])

        const completed_courses = await pool.query('SELECT COUNT(*) AS total FROM progress WHERE user_id = $1 AND percentual = 100', [user_id])

        const media = await pool.query('SELECT COALESCE(AVG(percentual), 0) AS media FROM progress WHERE user_id = $1', [user_id])

        return {
            total_cursos: total_courses.rows[0].total,
            cursos_concluidos: completed_courses.rows[0].total,
            media_progresso: Number(media.rows[0].media)
        }
    }
}

//Resumo do usuário (média, cursos concluídos)
//média = soma de todos os progressos dividido pela quantidade de cursos feitos