# Full-Stack Internship Coding Task

This project is a CRUDS (Create, Read, Update, Delete, and Send) application built using Next.js for the frontend, Express.js for the backend, and MongoDB as the database. It allows users to perform various operations on a collection of data, including adding, viewing, updating, deleting, and sending data via email.

## Features

- **UI**: The user interface includes a form, a table, and buttons for various operations.
- **Form**: Users can input data including Name, Phone Number, Email, and Hobbies. Validations are implemented for all form fields.
- **Table**: Displays data from the database with attributes including a checkbox for selection, ID, Name, Phone Number, Email, Hobbies, and buttons for updating and deleting data.
- **Buttons**:
  - **Send**: Sends data of selected rows to the specified email address.
  - **Add New Data**: Opens a pop-up form to add a new entry to the table.
- **Validation**: Form fields are validated to ensure data integrity.
- **Backend APIs**: Built using Express.js, providing endpoints for CRUD operations and sending email.
- **Database**: MongoDB is used as the database to store and retrieve data.
- **Deployment**: Hosted on Heroku for backend and Netlify for frontend.
- **GitHub Repo**: [Link to GitHub Repository](https://github.com/shaikahmadnawaz/next-data)

## Setup

1. Clone the GitHub repository to your local machine.
2. Install dependencies for both the client and server using `npm install`.
3. Set up environment variables:
   - Create a `.env` file in the root directory of the backend project.
   - Add environment variables for MongoDB connection string, email credentials, and any other necessary variables.
4. Start the backend server using `npm start` or `npm run dev`.
5. Start the frontend server using `npm start` or `npm run dev`.
6. Access the application in your browser at the specified URL.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Deployment**: Vercel
- **Others**: Node.js, Nodemailer

## Running Locally

To run the application locally, follow the setup instructions mentioned above. Ensure you have Node.js, MongoDB installed on your machine, and necessary environment variables configured.

## Live Demo

The application is deployed on Vercel. You can access the live demo using the following links:

- **Frontend**: [Live Demo](https://next-data-sigma.vercel.app)
- **Backend**: [Live Demo](https://next-data-express-api.vercel.app)
