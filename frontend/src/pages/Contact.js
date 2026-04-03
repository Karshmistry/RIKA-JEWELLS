// // Contact.js - COMPLETE VERSION
// import React, { useState } from "react";
// import "./Contact.css";

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       console.log("Form submitted:", formData);
//       setIsSubmitting(false);
//       setSubmitStatus("success");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });

//       // Reset status after 5 seconds
//       setTimeout(() => setSubmitStatus(null), 5000);
//     }, 1500);
//   };

//   return (
//     <div className="contact-page">
//       {/* Hero Section */}
//       <div className="contact-hero">
//         <h1>Contact Us</h1>
//         <p>We're here to help with all your jewellery needs. Get in touch with our experts.</p>
//       </div>

//       <div className="contact-grid">
//         {/* Contact Information */}
//         <div className="contact-info">
//           <h2>Get In Touch</h2>

//           <div className="info-item">
//             <div className="info-icon">📧</div>
//             <div className="info-content">
//               <h3>Email Address</h3>
//               <p>
//                 <a href="mailto:support@rikajewels.com">support@rikajewels.com</a>
//               </p>
//               <p>
//                 <a href="mailto:sales@rikajewels.com">sales@rikajewels.com</a>
//               </p>
//             </div>
//           </div>

//           <div className="info-item">
//             <div className="info-icon">📞</div>
//             <div className="info-content">
//               <h3>Phone Numbers</h3>
//               <p>
//                 <a href="tel:+918160136653">+91 81601 36653</a> (Customer Care)
//               </p>
//               <p>
//                 <a href="tel:+911800123456">1800-123-4567</a> (Toll Free)
//               </p>
//               <p>
//                 <a href="tel:+912212345678">+91 22 1234 5678</a> (Corporate)
//               </p>
//             </div>
//           </div>

//           <div className="info-item">
//             <div className="info-icon">📍</div>
//             <div className="info-content">
//               <h3>Store Address</h3>
//               <p>
//                 <strong>Rika Jewels Flagship Store</strong><br />
//                 Harihar, Near Inox Bholev<br />
//                 Bharuch, Gujarat 392001<br />
//                 India
//               </p>
//             </div>
//           </div>

//           <div className="business-hours">
//             <h3>Business Hours</h3>
//             <ul className="hours-list">
//               <li>
//                 <span className="day">Monday - Friday</span>
//                 <span>10:00 AM - 8:00 PM</span>
//               </li>
//               <li>
//                 <span className="day">Saturday</span>
//                 <span>10:00 AM - 9:00 PM</span>
//               </li>
//               <li>
//                 <span className="day">Sunday</span>
//                 <span>11:00 AM - 7:00 PM</span>
//               </li>
//               <li>
//                 <span className="day">Festive Days</span>
//                 <span>10:00 AM - 10:00 PM</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <div className="contact-form">
//           <h2>Send Us a Message</h2>

//           {submitStatus === "success" && (
//             <div className="success-message" style={{
//               background: "#d4edda",
//               color: "#155724",
//               padding: "1rem",
//               borderRadius: "8px",
//               marginBottom: "1.5rem",
//               border: "1px solid #c3e6cb"
//             }}>
//               ✅ Thank you! Your message has been sent successfully.
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Full Name *</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email Address *</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email address"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="phone">Phone Number *</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your 10-digit phone number"
//                 pattern="[0-9]{10}"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="subject">Subject</label>
//               <select
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a subject</option>
//                 <option value="general">General Inquiry</option>
//                 <option value="order">Order Status</option>
//                 <option value="return">Return & Exchange</option>
//                 <option value="repair">Jewellery Repair</option>
//                 <option value="custom">Custom Design</option>
//                 <option value="wholesale">Wholesale Inquiry</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Your Message *</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 placeholder="Please describe your inquiry in detail..."
//                 rows="5"
//               />
//             </div>

//             <button 
//               type="submit" 
//               className="submit-btn"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="spinner"></span>
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   📨 Send Message
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Store Locations */}
//       <div className="store-locations">
//         <h2>Our Store Locations</h2>
//         <div className="stores-grid">
//           <div className="store-card">
//             <h3>📍 Bharuch Flagship Store</h3>
//             <p>Harihar, Near Inox Bholev<br />
//                Bharuch, Gujarat 392001</p>
//             <p><strong>Timings:</strong> 10 AM - 8 PM</p>
//             <p><strong>Phone:</strong> +91 81601 36653</p>
//           </div>

//           <div className="store-card">
//             <h3>📍 Surat Showroom</h3>
//             <p>Adajan Patia, Near VR Mall<br />
//                Surat, Gujarat 395009</p>
//             <p><strong>Timings:</strong> 10 AM - 9 PM</p>
//             <p><strong>Phone:</strong> +91 261 2345678</p>
//           </div>

//           <div className="store-card">
//             <h3>📍 Vadodara Boutique</h3>
//             <p>Alkapuri, Near Sursagar Lake<br />
//                Vadodara, Gujarat 390007</p>
//             <p><strong>Timings:</strong> 10 AM - 8 PM</p>
//             <p><strong>Phone:</strong> +91 265 3456789</p>
//           </div>
//         </div>
//       </div>

//       {/* Emergency Contact */}
//       <div style={{
//         textAlign: "center",
//         marginTop: "3rem",
//         padding: "2rem",
//         background: "#fff8e1",
//         borderRadius: "10px",
//         border: "2px solid #ffd700"
//       }}>
//         <h3 style={{ color: "#1a1a1a", marginBottom: "1rem" }}>⚠️ Emergency Contact</h3>
//         <p style={{ color: "#666", marginBottom: "0.5rem" }}>
//           For order-related emergencies or urgent queries after business hours:
//         </p>
//         <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#d4af37" }}>
//           📱 WhatsApp: +91 81601 36653
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Contact;


import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
    appointmentDate: "",
    storeLocation: "bharuch"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("contact");

  const storeLocations = [
    {
      id: "bharuch",
      name: "Bharuch Flagship Store",
      address: "Harihar, Near Inox Bholev, Bharuch, Gujarat 392001",
      timings: "10:00 AM - 8:00 PM",
      phone: "+91 81601 36653",
      email: "bharuch@rikajewels.com",
      manager: "Mr. Rajesh Patel",
      features: ["Gold Hallmarking", "Custom Design", "Valuation Services", "Repairs"],
      coordinates: { lat: 21.6948, lng: 72.9665 }
    },
    {
      id: "surat",
      name: "Surat Diamond Bourse",
      address: "Adajan Patia, Near VR Mall, Surat, Gujarat 395009",
      timings: "10:00 AM - 9:00 PM",
      phone: "+91 261 2345678",
      email: "surat@rikajewels.com",
      manager: "Ms. Priya Shah",
      features: ["Diamond Certification", "International Designs", "Bulk Orders"],
      coordinates: { lat: 21.1702, lng: 72.8311 }
    },
    {
      id: "vadodara",
      name: "Vadodara Luxury Boutique",
      address: "Alkapuri, Near Sursagar Lake, Vadodara, Gujarat 390007",
      timings: "10:00 AM - 8:00 PM",
      phone: "+91 265 3456789",
      email: "vadodara@rikajewels.com",
      manager: "Mr. Amit Desai",
      features: ["Luxury Collection", "Private Viewing", "Personal Stylist"],
      coordinates: { lat: 22.3072, lng: 73.1812 }
    },
    {
      id: "ahmedabad",
      name: "Ahmedabad Showroom",
      address: "SG Highway, Near Alpha Mall, Ahmedabad, Gujarat 380054",
      timings: "10:00 AM - 9:00 PM",
      phone: "+91 79 4567890",
      email: "ahmedabad@rikajewels.com",
      manager: "Ms. Neha Gupta",
      features: ["Wedding Collection", "Bridal Consultation", "Exchange Facility"],
      coordinates: { lat: 23.0225, lng: 72.5714 }
    }
  ];

  const departments = [
    {
      name: "Customer Support",
      email: "support@rikajewels.com",
      phone: "+91 81601 36653",
      icon: "🎯",
      description: "Order tracking, returns & general queries"
    },
    {
      name: "Sales & Enquiries",
      email: "sales@rikajewels.com",
      phone: "+91 91601 36653",
      icon: "💎",
      description: "Product information & purchases"
    },
    {
      name: "Custom Design",
      email: "design@rikajewels.com",
      phone: "+91 82601 36653",
      icon: "🎨",
      description: "Personalized jewellery design"
    },
    {
      name: "Jewellery Repair",
      email: "repair@rikajewels.com",
      phone: "+91 83601 36653",
      icon: "🔧",
      description: "Repair & polishing services"
    },
    {
      name: "Corporate Sales",
      email: "corporate@rikajewels.com",
      phone: "+91 84601 36653",
      icon: "🏢",
      description: "Bulk orders & corporate gifting"
    },
    {
      name: "Careers",
      email: "careers@rikajewels.com",
      phone: "+91 85601 36653",
      icon: "👔",
      description: "Job opportunities at Rika Jewels"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        preferredContact: "email",
        appointmentDate: "",
        storeLocation: "bharuch"
      });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello Rika Jewels,\n\nI'm interested in: ${formData.subject}\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
    const url = `https://wa.me/918160136653?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const getDirections = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          storeLocation: formData.storeLocation,
          appointmentDate: formData.appointmentDate,
          type: 'appointment'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      alert(`Appointment booked at ${storeLocations.find(s => s.id === formData.storeLocation)?.name} on ${new Date(formData.appointmentDate).toLocaleString()}! Our team will contact you shortly.`);
      
      // Reset only appointment date
      setFormData(prev => ({
        ...prev,
        appointmentDate: "",
      }));
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Connect With Rika Jewels</h1>
            <p>Your premier destination for exquisite jewellery. We're here to assist you with all your needs.</p>
            <div className="hero-buttons">
              <button className="explore-btn" onClick={() => window.location.href = '/collections'}>
                Explore Collections
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Contact Tabs */}
      <div className="contact-tabs">
        <button
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          📧 Contact Form
        </button>
        <button
          className={`tab-btn ${activeTab === 'appointment' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointment')}
        >
          📅 Book Appointment
        </button>
        <button
          className={`tab-btn ${activeTab === 'stores' ? 'active' : ''}`}
          onClick={() => setActiveTab('stores')}
        >
          🏬 Store Locations
        </button>
      </div>

      {/* Main Contact Grid */}
      <div className="contact-container">
        {/* Contact Information Sidebar */}
        <div className="contact-sidebar">
          <h2 className="sidebar-title">Quick Contact</h2>

          <div className="contact-methods">
            <div className="method-card">
              <div className="method-icon">📞</div>
              <div className="method-content">
                <h3>Call Us</h3>
                <p>Available 9 AM - 9 PM</p>
                <button
                  className="method-btn call-btn"
                  onClick={() => handleCall("+918160136653")}
                >
                  Call Now
                </button>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">💬</div>
              <div className="method-content">
                <h3>WhatsApp</h3>
                <p>Instant response</p>
                <button
                  className="method-btn whatsapp-btn"
                  onClick={handleWhatsApp}
                >
                  Message on WhatsApp
                </button>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">📧</div>
              <div className="method-content">
                <h3>Email Us</h3>
                <p>24-48 hour response</p>
                <button
                  className="method-btn email-btn"
                  onClick={() => window.location.href = 'mailto:support@rikajewels.com'}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>

          {/* Department Contacts */}
          <div className="departments-section">
            <h3 className="departments-title">Contact by Department</h3>
            <div className="departments-grid">
              {departments.map((dept, index) => (
                <div className="department-card" key={index}>
                  <div className="dept-icon">{dept.icon}</div>
                  <div className="dept-info">
                    <h4>{dept.name}</h4>
                    <p className="dept-description">{dept.description}</p>
                    <p className="dept-contact">{dept.phone}</p>
                    <p className="dept-email">{dept.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="contact-main">
          {/* Contact Form */}
          {activeTab === 'contact' && (
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and our team will get back to you within 24 hours.</p>
              </div>

              {submitStatus === "success" && (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <div className="success-content">
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting Rika Jewels. Our team will get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your 10-digit phone number"
                      pattern="[0-9]{10}"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="return">Return & Exchange</option>
                      <option value="repair">Jewellery Repair</option>
                      <option value="custom">Custom Design</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="appointment">Store Appointment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your inquiry in detail..."
                    rows="6"
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="radio-label">Preferred Contact Method:</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === "email"}
                        onChange={handleChange}
                      />
                      <span className="radio-text">Email</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === "phone"}
                        onChange={handleChange}
                      />
                      <span className="radio-text">Phone Call</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="whatsapp"
                        checked={formData.preferredContact === "whatsapp"}
                        onChange={handleChange}
                      />
                      <span className="radio-text">WhatsApp</span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        📨 Send Message
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="whatsapp-submit-btn"
                    onClick={handleWhatsApp}
                  >
                    💬 Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Appointment Booking */}
          {activeTab === 'appointment' && (
            <div className="appointment-section">
              <div className="form-header">
                <h2>Book a Store Appointment</h2>
                <p>Schedule a personalized consultation at your nearest Rika Jewels store.</p>
              </div>

              <form onSubmit={handleAppointmentSubmit} className="appointment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="appointment-name">Full Name *</label>
                    <input
                      type="text"
                      id="appointment-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointment-phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="appointment-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your 10-digit phone number"
                      pattern="[0-9]{10}"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="storeLocation">Select Store Location *</label>
                  <div className="store-options">
                    {storeLocations.map(store => (
                      <label key={store.id} className="store-option">
                        <input
                          type="radio"
                          name="storeLocation"
                          value={store.id}
                          checked={formData.storeLocation === store.id}
                          onChange={handleChange}
                        />
                        <div className="store-info">
                          <div className="store-name">{store.name}</div>
                          <div className="store-address">{store.address}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentDate">Preferred Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointment-purpose">Purpose of Visit</label>
                  <textarea
                    id="appointment-purpose"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe what you're looking for (e.g., wedding jewellery, custom design, repair, etc.)"
                    rows="4"
                    className="form-textarea"
                  />
                </div>

                <div className="appointment-features">
                  <h3>What to Expect:</h3>
                  <ul>
                    <li>✅ Personalized consultation with jewellery expert</li>
                    <li>✅ Private viewing area available</li>
                    <li>✅ Custom design consultations</li>
                    <li>✅ Valuation & certification services</li>
                    <li>✅ Complimentary refreshments</li>
                  </ul>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Booking Appointment...
                      </>
                    ) : (
                      <>
                        📅 Confirm Appointment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Store Locations */}
          {activeTab === 'stores' && (
            <div className="stores-section">
              <div className="form-header">
                <h2>Our Store Locations</h2>
                <p>Visit us at any of our premium locations across Gujarat</p>
              </div>

              <div className="stores-grid">
                {storeLocations.map(store => (
                  <div className="store-card" key={store.id}>
                    <div className="store-header">
                      <div className="store-icon">💎</div>
                      <h3>{store.name}</h3>
                    </div>

                    <div className="store-details">
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{store.address}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">🕐</span>
                        <span className="detail-text">{store.timings}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📞</span>
                        <span className="detail-text">{store.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">👨‍💼</span>
                        <span className="detail-text">Manager: {store.manager}</span>
                      </div>
                    </div>

                    <div className="store-features">
                      <h4>Services Available:</h4>
                      <div className="features-tags">
                        {store.features.map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>

                    <div className="store-actions">
                      <button
                        className="direction-btn"
                        onClick={() => getDirections(store.address)}
                      >
                        📍 Get Directions
                      </button>
                      <button
                        className="store-call-btn"
                        onClick={() => handleCall(store.phone)}
                      >
                        📞 Call Store
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>🕐 What are your business hours?</h3>
            <p>Our stores are open Monday to Friday: 10 AM - 8 PM, Saturday: 10 AM - 9 PM, Sunday: 11 AM - 7 PM.</p>
          </div>
          <div className="faq-item">
            <h3>💎 Do you provide certification for diamonds and gold?</h3>
            <p>Yes, all our diamonds come with GIA/IGI certification and gold jewellery is hallmarked as per BIS standards.</p>
          </div>
          <div className="faq-item">
            <h3>🔄 What is your return policy?</h3>
            <p>We offer 30-day return policy on all jewellery with valid certification and original packaging.</p>
          </div>
          <div className="faq-item">
            <h3>🎨 Can I get custom jewellery designed?</h3>
            <p>Absolutely! Our custom design service allows you to create personalized jewellery with our expert designers.</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="emergency-contact">
        <div className="emergency-icon">⚠️</div>
        <div className="emergency-content">
          <h3>Emergency Contact</h3>
          <p>For urgent order-related queries after business hours:</p>
          <div className="emergency-contacts">
            <button className="emergency-btn" onClick={() => handleCall("+918160136653")}>
              📞 Call: +91 81601 36653
            </button>
            <button className="emergency-btn whatsapp" onClick={handleWhatsApp}>
              💬 WhatsApp Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;