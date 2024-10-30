const { Router } = require('express');
const data = require('./data');
const jwt = require('jsonwebtoken');
const session = require('./middleware');

const userController = new Router();

userController.post('/user/register', async (req, res) => {
  const user = req.body;
  const userData = {
    name: user.name,
    email: user.email,
    password: user.password,
    id: crypto.randomUUID()
  }
  // console.log(user)
  // const userData = { user, id: crypto.randomUUID() }
  data.push(userData);
  res.status(201).send({
    status: true,
    message: "Berhasil buat akun!"
  })
});

userController.post('/user/login', async (req, res) => {
  const login = req.body;
  // email dan password
  const user = data.filter((n) => n.email === login.email)[0];
  // if (!user[0]) {
  //   res.status(401).send({
  //     status: false,
  //     message: "Email atau Password salah"
  //   })
  // }

  // if (!(login.password === user.password)) {
  //   res.status(401).send({
  //     status: false,
  //     message: "Email atau Password salah"
  //   })
  // }

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).send({
    status: true,
    message: "Berhasil login!",
    token,
  })
})

userController.get('/user', session, async (req, res) => {
  if (data[0]) {
    res.status(200).send({
      status: true,
      message: "Data user berhasil ditemukan!",
      data,
    })
  } else {
    res.status(404).send({
      status: false,
      message: "Data user tidak ditemukan!",
      data,
    })
  }
});

module.exports = userController;