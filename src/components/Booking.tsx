"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker correctly
import 'react-datepicker/dist/react-datepicker.css';

function BookingForm() {
// export default function  BookingForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [addressLocation, setAddressLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };
 
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 12);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here

  if (dateOfBirth && dateOfBirth > minDate) {
    console.log(minDate)
    setErrorMessage('Please enter a valid date of birth (at least 12 years old).');
    return; // Prevent form submission
  }
    console.log('Form submitted:', {
      firstName,
      lastName,
      phoneNumber,
      email,
      dateOfBirth,
      addressLocation,
    });
  };


  return (
    <div className="bg-transparent p-8 rounded-lg shadow-md">
       
      <h2 className="text-2xl font-bold text-white mb-4">Form Booking Wizard</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-white text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-white text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-white text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-white text-sm font-bold mb-2">
              Date of Birth:
            </label>
            <div> 
              <DatePicker
                id="dateOfBirth"
                selected={dateOfBirth}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={minDate}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
            </div>
          </div>
          <div>
            <label htmlFor="addressLocation" className="block text-white text-sm font-bold mb-2">
              Address Location
            </label>
            <input
              type="text"
              id="addressLocation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={addressLocation}
              onChange={(e) => setAddressLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;