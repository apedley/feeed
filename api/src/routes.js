import { Router } from "express";
import Request from "request";

export default ({ config }) => {
  let api = Router();

  api.get('/request/:route', (req, res, next) => {
    if (!req.params.route) {
      return res.send('ok');
    }
    
    const route = req.params.route;

    let url = config.baseUrl + route + "?apiKey=" + config.apiKey;

    for (let key in req.query) {
      url = url + `&${key}=${req.query[key]}`
    }

    Request.get(url, (err, response, body) => {
      res.header("Content-Type",'application/json');
      
      res.send(body);
    })
  })


  return api;
}