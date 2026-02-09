import { Router } from "express"

import { CreateUserController } from "../controllers/createUserController"
import { ListUsersController } from "../controllers/listUsersController"
import { CreateCourseController } from "../controllers/createCourseController"
import { ListCoursesController } from "../controllers/listCoursesController"
import { CreateProgressController } from "../controllers/createProgressController"
import { CreateRegistrationController } from "../controllers/createResgistrationController"
import { GetProgressByIdController } from "../controllers/getProgressByIdController"
import { GetUsersOfACourseController } from "../controllers/getUsersOfACourseController"
import { GetCourseOfAUserController } from "../controllers/getCourseOfAUsersController"
import { UserSummaryController } from "../controllers/userSummaryController"
import { UserRankingController } from "../controllers/userRankingController"

export const router = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const createCourseController = new CreateCourseController()
const listCoursesController = new ListCoursesController()
const createProgressController = new CreateProgressController()
const createRegistrationController = new CreateRegistrationController()
const getProgressByIdController = new GetProgressByIdController()
const getUsersOfACourseController = new GetUsersOfACourseController()
const getCourseOfAUserController = new GetCourseOfAUserController()
const userSummaryController = new UserSummaryController()
const userRankingController = new UserRankingController()

//USER ROUTES
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Cria um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: Pedro Miotto
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/users", (req, res) => createUserController.handle(req, res))


/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Lista usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", (req, res) => listUsersController.handle(req, res))

//COURSES ROUTES
/**
 * @swagger
 * /courses:
 *   post:
 *     tags: [Courses]
 *     summary: Cria um curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: Curso de JavaScript
 *     responses:
 *       201:
 *         description: Curso criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/courses", (req, res) => createCourseController.handle(req, res))

/**
 * @swagger
 * /courses:
 *   get:
 *     tags: [Courses]
 *     summary: Lista todos os cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/courses", (req, res) => listCoursesController.handle(req, res))

//PROGRESS ROUTE
/**
 * @swagger
 * /progress:
 *   post:
 *     tags: [Progress]
 *     summary: Cria um progresso para um usuário em um curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               course_id:
 *                 type: string
 *               percentual:
 *                 type: integer
 *           example:
 *             user_id: 8b74af07-b9c2-413b-968e-1726d099dcdf
 *             course_id: 96675613-9e52-41fa-b50a-4fba3058fb44
 *             percentual: 98
 *     responses:
 *       201:
 *         description: Progresso criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Progress'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/progress", (req, res) => createProgressController.handle(req, res))

//REGISTRATION ROUTE
/**
 * @swagger
 * /registration:
 *   post:
 *     tags: [Registration]
 *     summary: Registra um usuário em um curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               course_id:
 *                 type: string
 *           example:
 *             user_id: 8b74af07-b9c2-413b-968e-1726d099dcdf
 *             course_id: f9cecbe1-d5be-4efe-8227-4cb605e95094
 *     responses:
 *       201:
 *         description: Matrícula criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/registration", (req, res) => createRegistrationController.handle(req, res))

//GET PROGRESS BY ID ROUTE
/**
 * @swagger
 * /progress/{user_id}:
 *   get:
 *     tags: [Progress]
 *     summary: Busca progresso pelo id do usuário
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/progress/:user_id", (req, res) => getProgressByIdController.handle(req, res))

//usuários de um curso
/**
 * @swagger
 * /courses/{course_id}:
 *   get:
 *     tags: [Courses]
 *     summary: Lista usuários de um curso
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/courses/:course_id", (req, res) => getUsersOfACourseController.handle(req, res))

//cursos de um usuário
/**
 * @swagger
 * /courses/user/{user_id}:
 *   get:
 *     tags: [Courses]
 *     summary: Lista cursos de um usuário
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/courses/user/:user_id", (req, res) => getCourseOfAUserController.handle(req, res))

//média de progresso e cursos terminados
/**
 * @swagger
 * /courses/progress/{user_id}:
 *   get:
 *     tags: [Courses]
 *     summary: Retorna resumo do usuário (média de progresso e cursos terminados)
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/courses/progress/:user_id", (req, res) => userSummaryController.handle(req, res))

//ranking por média de progresso
/**
 * @swagger
 * /users/ranking:
 *   get:
 *     tags: [Users]
 *     summary: Ranking de usuários por média de progresso
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get("/users/ranking", (req, res) => userRankingController.handle(req, res))