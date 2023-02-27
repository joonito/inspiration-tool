import * as React from 'react'
import './App.css'
import Form from './Form'

interface ResponseObject {
  url: string
  prompt: string
}

interface ResponseData {
  message: Array<ResponseObject>
}

function App() {
  const [prompt, setPrompt] = React.useState('')
  const [responseData, setResponseData] = React.useState<ResponseData>({
    message: [],
  })
  const [loading, setLoading] = React.useState(true)

  const onClick = async () => {
    setLoading(true)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ prompt }),
    }
    const data = await fetch('http://127.0.0.1:3000/', requestOptions)
    const jsonData = await data.json()
    setResponseData({
      message: jsonData.message,
    })
    setLoading(false)
    console.log(responseData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form onClick={onClick} prompt={prompt} setPrompt={setPrompt} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {responseData.message.map((item, index) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '300',
                  height: '300',
                  borderColor: 'red',
                  borderWidth: '1px',
                }}
              >
                <img key={index} src={item.url} alt="" />
                <div
                  style={{
                    width: '300',
                  }}
                >
                  <p>{item.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  )
}

export default App
