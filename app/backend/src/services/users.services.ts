// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
import { compareSync } from 'bcryptjs';
import { IUsers, IJwt } from '../interfaces/users.interfaces';
import userModel from '../database/models/User';

class UsersServices {
  public static async postUserServices(userLogin: IUsers): Promise<IJwt | boolean> {
    const { email, password } = userLogin;
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    // As senhas que existem no banco de dados estão encriptadas. Veja a seção de Criptografia de Senhas para mais detalhes de como comparar a senha do banco com a senha do corpo da requisição.
    const check = user && compareSync(password, user.password);
    if (check) {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      };
    }

    return false;
  }
}

export default UsersServices;
