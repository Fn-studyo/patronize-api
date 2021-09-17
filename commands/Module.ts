import { join } from 'path'
import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import Application from '@ioc:Adonis/Core/Application'

export default class Module extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'module'

  public root = Application.appRoot

  public path = Application.makePath

  @args.string({ description: 'Name of the module you want to create' })
  public name: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Creates a new module'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    //const { default: Application } = await import('@ioc:Adonis/Core/Application')
    const modulePath = `${this.root}/app/Modules/${this.name}`
    try {
      await this.createModules(this.name)
      return this.logger.success(`${this.name} Module is generated on '${modulePath}'`)
    } catch (error) {
      return this.logger.error(`Failed to generate ${this.name} Module ${error.stack}`)
    }
  }

  private async createModules(moduleName) {
    await this.createController(moduleName)
    await this.createRouting(moduleName)
    await this.createService(moduleName)
  }

  private async createController(moduleName) {
    moduleName = moduleName[0].toUpperCase() + moduleName.slice(1)
    const name = 'controller'
    const methods: string[] = ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']
    this.generator
      .addFile(name)
      .appRoot(this.application.appRoot)
      .destinationDir(`app/Modules/${moduleName}`)
      .useMustache()
      .stub(join(__dirname, './templates/controller.mustache'))
      .apply({ name, methods })

    await this.generator.run()
  }

  private async createRouting(moduleName) {
    moduleName = moduleName[0].toUpperCase() + moduleName.slice(1)
    await this.generator
      .addFile('routes')
      .appRoot(this.application.appRoot)
      .destinationDir(`app/Modules/${moduleName}`)
      .useMustache()
      .stub(join(__dirname, './templates/routes.mustache'))
    await this.generator.run()
  }

  private async createService(moduleName) {
    moduleName = moduleName[0].toUpperCase() + moduleName.slice(1)
    this.generator
      .addFile('service')
      .appRoot(this.application.appRoot)
      .destinationDir(`app/Modules/${moduleName}`)
      .useMustache()
      .stub(join(__dirname, './templates/service.mustache'))
      .apply({ name: moduleName })

    await this.generator.run()
  }
}
