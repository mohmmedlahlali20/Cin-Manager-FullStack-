import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext'; 
import { Button } from 'primereact/button';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const path = import.meta.env.VITE_BACK_END_URI;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('avatar', avatar);
    formData.append('dateOfBirth', dateOfBirth);

    try {
      const response = await axios.post(`${path}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md w-96"
      >
        <h2 className="mb-4 text-lg font-bold text-center">Register</h2>

        <div className="mb-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="First Name" 
              className="w-full p-inputtext"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Last Name" 
              className="w-full p-inputtext"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              className="w-full p-inputtext"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <InputText 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="w-full p-inputtext"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-map"></i>
            </span>
            <InputText 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Address" 
              className="w-full p-inputtext"
            />
          </div>
        </div>

        <div className="mb-4">
          <input 
            type="file" 
            onChange={(e) => setAvatar(e.target.files[0])} 
            accept="image/*" 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar"></i>
            </span>
            <InputText 
              value={dateOfBirth} 
              onChange={(e) => setDateOfBirth(e.target.value)} 
              placeholder="Date of Birth" 
              type="date" 
              className="w-full p-inputtext"
            />
          </div>
        </div>

        <Button 
          label="Register" 
          type="submit" 
          className="w-full mt-4 p-button-success"
        />
      </form>
    </div>
  );
}
