const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Utility Functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const processInput = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;
  let isPrimeFound = false;

  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(Number(item))) isPrimeFound = true;
    } else if (typeof item === "string") {
      alphabets.push(item);
      if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
        highestLowercase = item;
      }
    }
  }

  return { numbers, alphabets, highestLowercase, isPrimeFound };
};

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: "Invalid input" });
  }

  const { numbers, alphabets, highestLowercase, isPrimeFound } = processInput(data);

  res.status(200).json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
  });
});

module.exports = app;
