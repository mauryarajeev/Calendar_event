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

// GoogleCalendarInitView
const GoogleCalendarInitView = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly']
  });

  res.redirect(authUrl);
};

module.exports = GoogleCalendarInitView;
