import { PrismaClient } from '@prisma/client'
import { SALT_TIMES } from './config.js'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export class UserRepository {
  async create ({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_TIMES)
    console.log(hashedPassword)
    return await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword
      }
    })
  }

  async getUserByUsername (username) {
    return await prisma.user.findUnique({
      where: {
        name: username
      }
    })
  }

  async getUserById (id) {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async updateUser (id, data) {
    return await prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async deleteUser (id) {
    return await prisma.user.delete({
      where: {
        id
      }
    })
  }

  async getAllUsers () {
    return await prisma.user.findMany()
  }
}
