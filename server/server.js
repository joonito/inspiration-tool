import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-okgExYnQrnqCkHDYyS9LCE0Y",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
console.log(response);


import http from 'http';
import axios from 'axios';

const res = await axios.post(
    'https://api.openai.com/v1/completions',
    {
        'model': 'text-davinci-003',
        'prompt': 'Say "healthy relationship" in 5 different concrete expressions',
        'temperature': 0,
        'max_tokens': 500
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
    }
);
console.log(res.data.choices[0].text);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});