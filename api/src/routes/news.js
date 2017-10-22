import { Router } from "express";
import Request from "request";
import { sendError, firebaseAuthTokenMiddleware } from '../utils';

export default ({ config }) => {
  let api = Router();

  api.post('/request', firebaseAuthTokenMiddleware, (req, res, next) => {

    const requestData = req.body;
    
    if (!requestData.url) {
      return sendError(res, 'Missing url');
    }

    const resultLimit = requestData.limit || 100;

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

      if (Array.isArray(jsonData.articles)) {
        jsonData.articles = jsonData.articles.slice(0, resultLimit);
      }

      return res.json(jsonData);
    })
  })

  return api;
}