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
 return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="hexCode">10-Digit Hex Code:</label>
      <input
        type="text"
        name="hexCode"
        id="hexCode"
        value={formData.hexCode}
        onChange={handleChange}
        required
        pattern="^[a-fA-F0-9]{10}$"
      />
      <br />
  
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />
  
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />
  
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        name="address"
        id="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <br />
  
      <label htmlFor="bestPlayer">Best Player:</label>
      <input
        type="text"
        name="bestPlayer"
        id="bestPlayer"
        value={formData.bestPlayer}
        onChange={handleChange}
        required
      />
      <br />
  
      <button type="submit">Submit</button>
    </form>
  );
  
 
};

export default VoucherForm;
