import sgMail from '@sendgrid/mail';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config({ path: '../.env' });
const app = express();
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export function sendEmail(subject, text, to, from, name) {
  const templatePath = '../../frontend/src/assets/email_template.html';
  const template = fs.readFileSync(templatePath, 'utf8'); // Read HTML file
  const htmlContent = template.replace('{{name}}', name); // Replace placeholder

  const msg = {
    to: to, // recipient
    from: from, // verified sender
    subject: subject,
    text: text,
    html: htmlContent,
  }
  
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

// Example usage
// sendEmail('Testing email for Clio Hackathon', 'Hackathon email sent works!', 'emily.ho@clio.com', 'emily.ho@clio.com')
