import React from 'react';
import '../css/Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Have a question or feedback? We’d love to hear from you!</p>

          <div className="info-item">
            <strong>Phone:</strong> +123 456 7890
          </div>
          <div className="info-item">
            <strong>Email:</strong> support@recipenest.com
          </div>
          <div className="info-item">
            <strong>Location:</strong> Kathmandu, Nepal
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Your name" />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Write your message..."></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
