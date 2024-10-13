import React, { useState } from 'react'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address , setAddress] = useState('')
  const [avatar , setAvatar] = useState('')
  const [dateOfBirth , setDateOfBirth] = useState('')

  const path = import.meta.env.VITE_BACK_END_URI


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${path}/auth/register` , {
        firstName,
        lastName,
        email,
        password,
        address,
        avatar,
        dateOfBirth,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      }
    
    )
      
    } catch (error) {
      
    }
  }

  return (
    <div>
      hello react-register
    </div>
  )
}
