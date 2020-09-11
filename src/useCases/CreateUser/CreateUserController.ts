import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {

  constructor(
    private createUserUseCase: CreateUserUseCase, //Chamo a classe responsavel por executar o codigo principal
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body; // Pego os parâmetros do meu body da requisição

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })
  
      return response.status(201).send();
    }catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }

  }
}