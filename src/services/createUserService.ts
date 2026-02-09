import { pool } from "../db"

type CreateUserInput = {
    name: string
}

export class CreateUserService {
    async execute({ name }: CreateUserInput) {
        const sql = `
        INSERT INTO users (name)
        VALUES ($1)
        RETURNING id, name
        `
        const result = await pool.query(sql, [name])

        return result.rows[0]
    }
}