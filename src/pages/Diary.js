import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const Diary = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    diaryEntry: ''
  })

  const formatDate = () => {
    const date = new Date()
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    let formattedDate = date.toLocaleDateString('pt-BR', options)

    formattedDate = formattedDate
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return formattedDate
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleEditorChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      diaryEntry: content
    }))
  }

  const saveDiaryEntry = () => {
    console.log('Saving diary entry:', formData)
    // Implemente a lógica de salvamento aqui
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl text-center text-white mb-8">
          {' '}
          {formatDate()}
        </h1>
        <form className="w-full">
          <div className="flex justify-center mb-4" style={{ gap: '20px' }}>
            <div className="flex flex-col" style={{ flex: '2.5' }}>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="title"
              >
                Título
              </label>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título do seu diário"
                style={{ backgroundColor: '#FFF9E3' }}
              />
            </div>

            <div className="flex flex-col" style={{ flex: '1' }}>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="data"
              >
                Data
              </label>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="data"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{ backgroundColor: '#FFF9E3' }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center mb-4">
            <Editor
              apiKey="ejc332i53z6d0t7hck21xkb15rqyje8frtp2u16mp5beq4xo"
              init={{
                height: 600,
                menubar: true,
                width: '100%',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'emoticons'
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help ',
                content_style:
                  'body { font-family: Roboto, sans-serif; font-size:20px; background-color: #FFF9E3; }'
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={saveDiaryEntry}
            >
              Salvar no diário
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Diary
