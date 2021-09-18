import User from 'App/Models/User'
import { createHash, randomBytes } from 'crypto'
import { CreateUserDto } from 'App/types/interfaces'

class UserService {
  public async createUser(body: CreateUserDto) {
    return await User.create(body)
  }
  public async getUserByEmail(email: string) {
    return await User.query().where('email', email).firstOrFail()
  }
  public async generateVerifyTokenForUser(id: string) {
    const verifyToken = randomBytes(32).toString('hex')
    const accountVerifyToken = createHash('sha256').update(verifyToken).digest('hex')
    await User.query()
      .where('id', id)
      .update({
        accountVerifyToken,
        accountVerifyExpires: new Date(Date.now() + 10 * 60 * 1000),
      })
  }
}

export default UserService
