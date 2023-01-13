// 3 - Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end
import { compareSync } from 'bcryptjs';
import { IUsers, IJwt } from '../interfaces/users.interfaces';
import userModel from '../database/models/User';
import { validateToken } from '../utils/jwt.util';

class UsersServices {
  public static async postUserServices(userLogin: IUsers): Promise<IJwt | boolean> {
    const { email, password } = userLogin;
    const user = await userModel.findOne({ where: { email } });

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

  // 12 - Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end
  // Deve ser uma rota GET que receba um header com parâmetro authorization, onde ficará armazenado o token gerado no login;
  // O avaliador verificará se ao tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário.
  public static async getUserServices(user: any | undefined): Promise<any> {
    const { data } = validateToken(user);
    const { id } = data;
    if (!id) {
      return {
        status: 401,
        message: { message: 'Not found' },
      };
    }
    const userId = await userModel.findByPk(id, { attributes: ['role'] });
    if (!userId) {
      return {
        status: 401,
        message: { message: 'Not found' },
      };
    }

    return { role: userId.role };
  }
}

export default UsersServices;
