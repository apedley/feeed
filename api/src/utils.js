import * as FirebaseAdmin from "firebase-admin";


export function sendError(res, message, status = 400) {
  const response = {
    error: true,
    data: message
  }
  res.status(status).json(response);
}


export function firebaseAuthTokenMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.sendStatus(401);
  }

  let token = authHeader.split(' ');
  FirebaseAdmin.auth().verifyIdToken(token[1])
  .then(decodedToken => {
    console.dir(decodedToken);
    res.locals.token = {
      decoded: decodedToken,
      encoded: token
    }
    next();
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(401);
  });
}