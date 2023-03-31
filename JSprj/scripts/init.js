use football-promo;

db.submissions.insertMany([
  {
    "hexCode": "1a2b3c4d5e",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "bestPlayer": "Player 1",
    "voucherCode": "VC10-JOH-001"
  },
  {
    "hexCode": "5e4d3c2b1a",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "address": "456 Oak St",
    "bestPlayer": "Player 2",
    "voucherCode": "VC10-JAN-002"
  }
]);
