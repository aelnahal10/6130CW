
// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = 'YOUR_MONGODB_CONNECTION_STRING';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

 
function generateVoucherCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 10;
    let result = '';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }


app.post('/api/submit', async (req, res) => {
  const { hexCode, name, email, address, bestPlayer } = req.body;

  // Connect to the MongoDB database
  await client.connect();

  // Get the 'submissions' collection in the 'football-promo' database
  const submissionsCollection = client.db('football-promo').collection('submissions');

  // Check if the 10-digit hexadecimal code has been used before
  const existingSubmission = await submissionsCollection.findOne({ hexCode });
  if (existingSubmission) {
    res.json({ success: false });
    return;
  }

  // Save the submitted form data to the 'submissions' collection
  const newSubmission = {
    hexCode,
    name,
    email,
    address,
    bestPlayer,
    // Generate voucher code here
    voucherCode: generateVoucherCode()
  };
  await submissionsCollection.insertOne(newSubmission);

  // Close the MongoDB connection
  await client.close();

  // Return the voucher code to the presentation tier
  res.json({ success: true, voucherCode: newSubmission.voucherCode });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
