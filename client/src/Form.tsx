import React, { useState } from 'react'

interface FormProps {
    onClick: () => void
    prompt: string
    setPrompt: React.Dispatch<React.SetStateAction<string>>
}

const Form: React.FC<FormProps> = ({onClick, prompt, setPrompt}) => {

  return (
    <>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          type="text"
          name="prompt"
          required
        />
        <button
          type="submit"
          onClick={onClick}
        >
          Submit
        </button>
    </>
  )
}
export default Form
