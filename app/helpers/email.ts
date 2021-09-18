import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class EmailService {
  public async sendVerificationEmail(to: string, link: string) {
    await Mail.send((message) => {
      message
        .from(Env.get('MAIL_FROM'), 'Patronize Test')
        .to(to)
        .subject('Verify your account!')
        .htmlView('emails/verify', { link })
    })
  }
}
