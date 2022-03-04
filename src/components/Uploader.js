import React, { useState } from 'react'
import axios from 'axios'

const Uploader = () => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [bodytext, setBodytext] = useState('')

  const upload = async (e) => {
    e.preventDefault()
    console.log('Submitted!')

    const url = await axios.post('/api/generate', {
      bucket: 'app--s3-presignedurl-upload',
      filename: file?.name,
    })

    console.log(url.data)

    const config = {
      headers: {
        'Content-Type': file.type
      }
    }
    const res = await axios.put(url.data, file, config)
    console.log(res)
  }

  return (
    <>
      <div>Uploader</div>
      <form onSubmit={upload}>
        <input type='file' onChange={e => setFile(e.target.files[0])} />
        <br />
        <input type='text' value={name} onChange={e => setName(e.target.value)} />
        <br />
        <input type='text' value={bodytext} onChange={e => setBodytext(e.target.value)} />
        <br />
        <input type='submit' value='Upload' />
        <div>{file?.name}</div>
        <div>{file?.type}</div>
        <div>{name}</div>
        <div>{bodytext}</div>
      </form>
    </>
  )
}

export default Uploader