import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>; //Função que recebe email por parâmetro e retorna um User
  save(user: User): Promise<void>;  //Função que recebe User por parâmetro e não retorna nada
}