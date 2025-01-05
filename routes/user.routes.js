import { UserRepository } from '../user-repository.js'
import { Router } from 'express'
import { SECRET_TOKEN, NODE_ENV } from '../config.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const router = Router()
const userRepository = new UserRepository()
router.get('/users', async (req, res) => {
  const userId = req.session.user
  try {
    if (!userId) return res.status(403).send('Not Authorized')
    const users = await userRepository.getAllUsers()
    return res.json(users)
  } catch (err) {
    console.log(`It failed with error : ${err}`)
  }
})

router.get('/user/:id', async (req, res) => {
  const userId = req.session.user
  try {
    if (!userId) return res.status(403).send('Not Authorized')
    const user = await userRepository.getUserById(req.params.id)
    res.json(user)
  } catch (err) {
    console.log(`There has been an error: ${err}`)
  }
})

router.post('/user', async (req, res) => {
  try {
    const user = await userRepository.create(
      req.body
    )
    res.json(user)
  } catch (err) {
    console.log(`It failed with error : ${err}`)
  }
})

router.delete('/user/:id', async (req, res) => {
  const userId = req.session.user
  try {
    if (!userId) return res.status(403).send('Not Authorized')
    await userRepository.deleteUser(req.params.id)
    res.send('User deleted')
  } catch (err) {
    console.log(`It failed with error : ${err}`)
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await userRepository.getUserByUsername(username)
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) return res.status(401).send('Wrong User or Password')
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_TOKEN, {
      expiresIn: '1h'
    })
    res
      .cookie('acces_token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })

      .send({ user, token })
  } catch (err) {
    console.log(`There has been an error: ${err}`)
  }
})
export default router
