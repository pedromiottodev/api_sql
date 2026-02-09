import { pool } from "../db"

type CreateCourseInput = {
    name: string
}

export class CreateCourseService {
    async execute({name}: CreateCourseInput) {
      const sql = `
      INSERT INTO course (name)
      VALUES ($1)
      RETURNING id, name
      `
      const result = await pool.query(sql, [name])

      return result.rows[0]
    }
}