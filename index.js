const express = require('express');
const app = express();
const GoogleCalendarInitView = require('./GoogleCalendarInitView');
const GoogleCalendarRedirectView = require('./GoogleCalendarRedirectView');

// Routes
app.get('/rest/v1/calendar/init/', GoogleCalendarInitView);
app.get('/rest/v1/calendar/redirect/', GoogleCalendarRedirectView);

//server listening
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
