const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const SurveyResponseSchema = new mongoose.Schema({
  formId: String,
  response: Object,
  submittedAt: { type: Date, default: Date.now }
});
const SurveyResponse = mongoose.model('SurveyResponse', SurveyResponseSchema);

app.post('/submit', async (req, res) => {
  try {
    const survey = new SurveyResponse(req.body);
    await survey.save();
    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
