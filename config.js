import 'dotenv/config'
export const PORT = process.env.PORT
export const SECRET_TOKEN = process.env.SECRET_TOKEN
export const NODE_ENV = process.env.NODE_ENV
export const SALT_TIMES = Number.parseInt(process.env.SALT_TIMES)
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN
