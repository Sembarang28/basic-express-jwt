const jwt = require('jsonwebtoken');

async function session(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: false,
      message: "Tidak ada token",
    })
  }
  const authToken = req.headers.authorization;
  try {
    const token = authToken.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    next()
  } catch (error) {
    res.status(403).send({
      status: false,
      message: "Token tidak valid"
    })
  }
}

module.exports = session;