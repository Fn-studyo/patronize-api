import Mail from '@ioc:Adonis/Addons/Mail'

export default class EmailService {
  public async sendVerificationEmail(to: string, link: string) {
    await Mail.send((message) => {
      message
        .from('info@example.com', 'Patronize Test')
        .to(to)
        .subject('Verify your account!')
        .htmlView('emails/welcome', { link })
    })
  }
}
