import User from 'App/Models/User'
import { createHash, randomBytes } from 'crypto'
import { CreateUserDto } from 'App/types/interfaces'
import Hash from '@ioc:Adonis/Core/Hash'

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
    return verifyToken
  }

  public async getUserByVerificationToken(token: string) {
    const accountVerifyToken = createHash('sha256').update(token).digest('hex')

    const user = await User.query()
      .where('accountVerifyToken', accountVerifyToken)
      .where('accountVerifyExpires', '<', new Date(Date.now() + 10 * 60 * 1000))
      .first()

    if (!user) throw new Error('Invalid verification token')
    return user
  }

  public async verifyUser(id: string) {
    return await User.query().where('id', id).update({
      accountVerifyToken: null,
      accountVerifyExpires: null,
      email_verified_at: new Date(),
    })
  }

  public async generateResetTokenForUser(id: string) {
    const resetToken = randomBytes(32).toString('hex')
    const passwordResetToken = createHash('sha256').update(resetToken).digest('hex')
    await User.query()
      .where('id', id)
      .update({
        passwordResetToken,
        passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
      })

    return resetToken
  }

  public async getUserByResetToken(token: string): Promise<User> {
    const passwordResetToken = createHash('sha256').update(token).digest('hex')

    const user = await User.query()
      .where('accountVerifyToken', passwordResetToken)
      .where('accountVerifyExpires', '<', new Date(Date.now() + 10 * 60 * 1000))
      .first()

    if (!user) throw new Error('Invalid reset token')
    return user
  }

  public async resetUserPassword(id: string, pass: string) {
    const password = await Hash.make(pass)

    await User.query().where('id', id).update({
      password,
      passwordResetToken: null,
      passwordResetExpires: null,
      passwordChangedAt: new Date(),
    })

    return {
      message: 'Password changed successfully',
    }
  }
}

export default UserService
