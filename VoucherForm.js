// src/VoucherForm.js
import React, { useState } from 'react';

const VoucherForm = () => {
  // Set up initial form state
  const [formData, setFormData] = useState({
    hexCode: '',
    name: '',
    email: '',
    address: '',
    bestPlayer: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to the backend API
    const response = await fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Process the response from the backend API
    const result = await response.json();
    if (result.success) {
      // Display the voucher code to the user
      alert(`Voucher Code: ${result.voucherCode}`);
    } else {
      // Display an error message if the code is invalid or has been used before
      alert('Invalid code or code has been used before.');
    }
  };

 
};

export default VoucherForm;
