import React, { useState } from 'react';

function SurveyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formId: "feedback_form_v1",
        response: { name, email, feedback }
      }),
    });

    if (response.ok) setSubmitted(true);
  };

  if (submitted) return <p>Thank you for your feedback!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Feedback:</label><br />
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SurveyForm;
