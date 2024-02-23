import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {

  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const hanldeSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8888/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
        const data = await response.json()
        setForm({ ...form, photo: data.photo })
      } catch (error) {
        console.log(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
          Create imaginative and visuall stunning images through DALL-E AI and share them with the community
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            LableName="your name"
            type="text"
            name="name"
            palceholder="Khalfi Aymen"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LableName="prompt"
            type="text"
            name="prompt"
            palceholder="an oil pastel drawing of an annoyed cat in a spaceship"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            hanldeSurpriseMe={hanldeSurpriseMe}
          />
          <div
            className='!w-full flex flex-row justify-start items-center gap-20'>
            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focuse:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className='w-full h-full object-contain'
                />
              ) : (
                <img
                  src={preview}
                  alt='preview'
                  className='w-9/12 h-9/12 object-contain opacity-40'
                />
              )}
              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                  <Loader />
                </div>
              )}
            </div>
            <div className='flex-1 flex justify-start items-start flex-row gap-3 bg-yellow-200 p-4 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              <p className='text-gray-900 font-bold mt-4'>
                Please wait while the image is being generated. This process may take some time as I am  using a free API module. Thank you for your patience.
              </p>
            </div>

          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='w-full text-white bg-green-700 font-medium rounded-md text-sm  sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p
            className='mt-2 text-[#666e75] text-[14px]'>
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6369ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost