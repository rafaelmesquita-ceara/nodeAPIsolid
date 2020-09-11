import { uuid } from 'uuidv4'

export class User {

  public readonly id: string; // Não poderá mais ser alterado após definido o id

  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, 'id'>, id?: string){ // Props para pegar as propriedades do User, Omit para receber apenas name email e password, id? para ser opcional
    Object.assign(this, props); // Passar todas as propriedades contidas em props para o this, uma por uma
    
    if (!id) {
      this.id = uuid();
    }
  }

}