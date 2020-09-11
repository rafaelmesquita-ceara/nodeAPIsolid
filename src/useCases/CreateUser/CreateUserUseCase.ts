import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository // private para não precisar fazer o this.usersRepository
  ){
    
  }


  async execute(data: ICreateUserRequestDTO){ // data recebe o tipo de data pelo DTO
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email); // Verifica se o email já existe
    if (userAlreadyExists) {
      throw new Error('User already exists.'); // Se sim, ele estoura um erro
    }

    const user = new User(data); // Recebe o usuario pelo DTO

    await this.usersRepository.save(user); // Salva o usuario no meu método save
  }
}