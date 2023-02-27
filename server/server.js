import { Configuration, OpenAIApi } from 'openai'
import http from 'http'
import axios from 'axios'
import express from 'express'
import cors from 'cors'
const app = express()
const configuration = new Configuration({
  organization: 'org-okgExYnQrnqCkHDYyS9LCE0Y',
  apiKey: '[API_KEY]',
})
const openai = new OpenAIApi(configuration)

let corsOptions = {
  origin: ['*'],
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use(cors(corsOptions), express.json())

app.post('/', async (req, res) => {
  console.log(req.body)
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: `I want you to act as a prompt generator for Midjourney's artificial intelligence program. Your job is to provide detailed and creative descriptions in 9 different variations that will inspire unique and interesting images from the AI. Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts, so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city, or a surreal landscape filled with strange creatures. The more detailed and imaginative your description, the more interesting the resulting image will be. Here is your first prompt: ${req.body.prompt}'`,
      temperature: 0,
      max_tokens: 1000,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer [API_KEY]',
      },
    },
  )
  const splitted = response.data.choices[0].text.split('\n')
  
  const imgs = []
  const prompts = []
  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i] === '') continue;
    prompts.push(splitted[i])
  }
  console.log(prompts)
  axios.all(prompts.map((prompt) => {
    return axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
          'Bearer [API_KEY]',
        },
      },
    )
  })).then(axios.spread((...responses) => {
    responses.forEach((response) => {
      imgs.push({
        url: response.data.data[0].url,
      })
    })
  res.send({ message: imgs })

  })).catch((errors) => {
    console.log(errors)
  })

})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
