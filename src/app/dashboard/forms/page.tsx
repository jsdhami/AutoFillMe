'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import axios from 'axios'

const Page = () => {
  const [formUrl, setFormUrl] = useState('')  // Store the Google Form URL
  const [extractedText, setExtractedText] = useState([])  // Store the extracted text
  const [error, setError] = useState('')  // Store any error message
  const [showFrame, setShowFrame] = useState(false);  // Store any error message

  const data = {
    "Name" : "Yujal",
    "Email": "shresthayujal46@gmail.com",
    "Address": "Kathmandu",
    "Phone number": "9808779843"  }
  // Handle changes to the input field
  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUrl(event.target.value)
  }

  // Handle the Fetch button click event
  const handleFetch = async () => {
    if (!formUrl) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      // Send the URL to the API route
      const response = await axios.get(`http://127.0.0.1:8000/scrape?url=${encodeURIComponent(formUrl)}`);

      // If successful, store the extracted text in state
      setExtractedText(response.data.extractedText);
      setError('');
    } catch (err) {
      // If an error occurs, display the error message
      setError('Error fetching data from the provided URL.');
      setExtractedText([]);
    }
    setShowFrame(true);
  }

  return (
    <div>
      <h1>Form Filling</h1>
      <input
        type="text"
        placeholder="Enter Google Form URL"
        value={formUrl}
        onChange={change}
        className="border p-2 mb-4 w-[50rem]"
      />
      <Button className="bg-blue-700 hover:bg-gray-900" onClick={handleFetch}>
        Fetch
      </Button>

      {error && <p className="text-red-500 mt-4">{error}</p>}  {/* Display error if any */}
      <div className='flex flex-row'>
      <div className='w-[40rem]'>
      {extractedText.length > 0 && (
        <div className="mt-4">
          <h3>Extracted Fields:</h3>
          <div className='flex flex-col p-4 gap-5'>
          {extractedText.map((text, index) => (
        data[text] !== undefined && ( // Only render if there's a matching key in data
          <div key={index}>
            <h1 className="mb-2">{text}</h1>
           <div className='border-2 p-3 '>
          {data[text]}  
          </div>
           
          </div>
        )
      ))}
          </div>
        </div>
      )}
      </div>
      {showFrame && (<div >
      <iframe className='w-[40rem] h-[70vh]' src={formUrl} ></iframe>
      </div>)}
      </div>
    </div>
  )
}

export default Page
