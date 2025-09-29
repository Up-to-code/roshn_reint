"use client";
import React, { useState } from 'react';
 
const AppointmentComponent = ({
  title = "Schedule Appointment",
  subtitle = "Book your consultation today",
  onSubmit,
  availableSlots = [
    "9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"
  ]
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const services = [
    "General Consultation",
    "Technical Support",
    "Project Discussion",
    "Product Demo",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form or show success message
    console.log('Appointment booked:', formData);
  };

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1 className="appointment-title">{title}</h1>
        <p className="appointment-subtitle">{subtitle}</p>
      </div>

      <div className="appointment-content">
        {/* Left Column - Information */}
        <div className="info-column">
          <div className="info-card">
            <h3>Why Choose Us?</h3>
            <ul className="features-list">
              <li>✓ Professional & Certified Experts</li>
              <li>✓ Flexible Scheduling</li>
              <li>✓ 24/7 Customer Support</li>
              <li>✓ Satisfaction Guaranteed</li>
            </ul>
          </div>

          <div className="contact-info">
            <h4>Contact Information</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ hello@company.com</p>
            <p>📍 123 Business Ave, Suite 100</p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="form-column">
          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="service">Service Type *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select time</option>
                  {availableSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Notes</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="form-textarea"
                placeholder="Any special requirements or notes..."
              />
            </div>

            <button type="submit" className="submit-button">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentComponent;