const {
  getUsers,
  createUser,
  updateUserEmail,
  updateUserName,
  updateUsername,
  updateUserPassword,
  getLastLogin,
  loginUser,
  createBrand,
  getBrands,
  updateBrandStatus,
  createCategory,
  getCategories,
  updateCategoryStatus,
  createModel,
  getModels,
  updateModelStatus,
  createEcr,
  getEcr,
  createDevice,
  getDevices,
  getUserbyID // Certifique-se de usar a nomenclatura correta
} = require('./API_Functions');

const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = (pool) => {
  // User Routes
  router.put('/users/email', authenticateToken, (req, res) => updateUserEmail(req, res, pool));
  router.put('/users/name', authenticateToken, (req, res) => updateUserName(req, res, pool));
  router.put('/users/username', authenticateToken, (req, res) => updateUsername(req, res, pool));
  router.put('/users/password', authenticateToken, (req, res) => updateUserPassword(req, res, pool));
  router.post('/users', (req, res) => createUser(req, res, pool));
  router.get('/users', authenticateToken, (req, res) => getUsers(req, res, pool));
  router.get('/users/last_login', authenticateToken, (req, res) => getLastLogin(req, res, pool));
  router.post('/login', (req, res) => loginUser(req, res, pool, jwt));
  router.get('/users/:id', authenticateToken, (req, res) => getUserbyID(req, res, pool)); // Adicione a autenticação correta

  // Brand Routes
  router.post('/brand', (req, res) => createBrand(req, res, pool));
  router.get('/brand', (req, res) => getBrands(req, res, pool));
  router.put('/brand/status/:id', authenticateToken, (req, res) => updateBrandStatus(req, res, pool));

  // Category Routes
  router.post('/category', (req, res) => createCategory(req, res, pool));
  router.get('/category', (req, res) => getCategories(req, res, pool));
  router.put('/category/status/:id', authenticateToken, (req, res) => updateCategoryStatus(req, res, pool));

  // Model Routes
  router.post('/model', (req, res) => createModel(req, res, pool));
  router.get('/model', (req, res) => getModels(req, res, pool));
  router.put('/model/status/:id', authenticateToken, (req, res) => updateModelStatus(req, res, pool));

  // ECR Routes
  router.post('/ecr', (req, res) => createEcr(req, res, pool));
  router.get('/ecr', (req, res) => getEcr(req, res, pool));

  // Device Routes
  router.post('/devices', authenticateToken, (req, res) => createDevice(req, res, pool));
  router.get('/devices', authenticateToken, (req, res) => getDevices(req, res, pool));

  return router;
};
