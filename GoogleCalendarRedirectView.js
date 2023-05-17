const { google } = require('googleapis');

// Configuration
const CLIENT_ID = '945063254599-dl469hpmj2c23kf8sg2fjv1mj0fjvl8k.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/rest/v1/calendar/redirect/';

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// GoogleCalendarRedirectView
const GoogleCalendarRedirectView = async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Create a calendar instance
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    // Fetch a list of events from the user's primary calendar
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Process and return the events as needed
    res.json(data.items);
  } catch (error) {
    console.error('Error retrieving access token:', error.message);
    res.status(500).send('An error occurred.');
  }
};

module.exports = GoogleCalendarRedirectView;
