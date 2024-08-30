# KYC Verification System

## Overview

Before proceeding this project is my submission for Xendit 2-day work trial

Please read the projects Software System Documentation here:
https://docs.google.com/document/d/1D925pZcO0N6Po7sdZW42kakwNvhRK4aYWPWhlXpZNZQ/edit?usp=sharing

This project is a robust Know Your Customer (KYC) backend software that allows partners (banks) to submit their customers' personal information for KYC verification. The system validates submitted information through multiple checks, including AML (Anti-Money Laundering) and CFT (Combating the Financing of Terrorism) checks, as well as facial recognition for liveness verification.

### Key Features

- Customer information submission
- AML and CFT checks
- Selfie liveness validation
- Operations team review interface
- Webhook notifications for status updates
- Configurable validation rules

## Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL
- Libraries: face_recognition, axios
- ORM: Sequelize
- Testing: Jest
- API Documentation: Swagger

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ilhamfadheel/kyc-verification-system.git
   ```

2. Install dependencies:
   ```
   cd kyc-verification-system
   npm install
   ```

3. Set up environment variables:
    - Copy `.env.example` to `.env`
    - Update the variables in `.env` with your configuration

4. Start the PostgreSQL database:
    - If using Docker:
      ```bash
      docker-compose up -d db
      ```
    - Otherwise, ensure your PostgreSQL instance is running

5. Start the server:
   ```
   npm run start
   ```

The server should now be running on `http://localhost:3000`.

## API Documentation

Once the server is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api-docs
```

## Running Tests

To run the test suite:

```
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
