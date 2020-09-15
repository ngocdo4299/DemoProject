import { loginUser, createUser } from './adminController.js';

export const login = async (req, res) => {
  const result = await loginUser(req);
  res.status(result.status).json(result);
};

export const registry = async (req, res) => {
  const result = await createUser(req);
  res.status(result.status).json(result);
};
