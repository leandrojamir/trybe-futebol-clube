// Status HTTP
// Tenha em mente que todas as "respostas" devem respeitar os status do protocolo HTTP, com base no que o REST prega.
// Alguns exemplos:
// Requisições que precisam de token mas não o receberam devem retornar um código de status 401;
// Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;
// Um problema inesperado no servidor deve retornar um código de status 500;
// Um acesso ao criar um recurso, no nosso caso usuário ou partida, deve retornar um código de status 201.
// Quando solicitado algo que não existe no banco, deve retornar um código de status 404.
import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/http.exception';

const statusHTTP = (
  _req: Request,
  res: Response,
  next: NextFunction,
  erro: Error,
) => {
  const { status, message } = erro as HttpException;
  if (status) {
    return res.status(status || 500).json({ message });
  }

  next();
};

export default statusHTTP;
