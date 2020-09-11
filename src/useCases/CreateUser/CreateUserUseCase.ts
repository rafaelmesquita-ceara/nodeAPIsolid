import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository, // private para não precisar fazer o this.usersRepository
    private mailProvider : IMailProvider
  ){
    
  }


  async execute(data: ICreateUserRequestDTO){ // data recebe o tipo de data pelo DTO
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email); // Verifica se o email já existe
    if (userAlreadyExists) {
      throw new Error('User already exists.'); // Se sim, ele estoura um erro
    }

    const user = new User(data); // Recebe o usuario pelo DTO

    await this.usersRepository.save(user); // Salva o usuario no meu método save

    this.mailProvider.sendMail({
      to: {
        name : data.name,
        email : data.email
      },
      from: {
        name : 'Equipe do meu App',
        email : 'equipe@meuapp.com',
      },
      subject : 'Seja bem-vindo à plataforma',
      body : '<p>Você já pode fazer login em nossa plataforma</p>'
    }
    );
  }
}