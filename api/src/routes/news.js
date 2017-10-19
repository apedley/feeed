import { Router } from "express";
import Request from "request";
import { sendError, firebaseAuthTokenMiddleware } from '../utils';

export default ({ config }) => {
  let api = Router();

  // api.get('/sources/:language', (req, res) => {
  //   const url = `${config.newsBaseUrl}/sources?apiKey=${config.newsApiKey}&language=${req.params.language}`;
    

  //   Request.get(url, (err, response, body) => {
  //     const jsonData = JSON.parse(body);
  //     if (jsonData.status !== 'ok') {
  //       return sendError(res, 'not a good list')
  //     }

  //     return res.json(jsonData);
  //   });
  // });


  api.post('/request', firebaseAuthTokenMiddleware, (req, res, next) => {

    const requestData = req.body;

    if (!requestData.url) {
      return sendError(res, 'Missing url');
    }

    const lastUrlCharacter = requestData.url[requestData.url.length-1];
    
    if (lastUrlCharacter !== "?" && lastUrlCharacter !== "&") {
      return sendError(res, 'Url must end with ? or $ for API key');
    }

    const url = `${requestData.url}apiKey=${config.newsApiKey}`
    
    Request.get(url, (err, response, body) => {
      const jsonData = JSON.parse(body);
      if (jsonData.status !== 'ok') {
        return sendError(res, jsonData.message)
      }

      return res.json(jsonData);
    })
  })

  return api;
}