const express = require('express');
const app = express();
const cors = require('cors');

const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  res.json(getTimestamp(new Date()));
});

app.get("/api/:timestamp", (req, res) => {
  let timestamp;
  const dateString = req.params.timestamp;

  if (dateString === undefined || dateString.trim() === "") {
    timestamp = getTimestamp(new Date());
  } else {
    const date = !isNaN(dateString) ?
      new Date(parseInt(dateString)) :
      new Date(dateString);

    if (!isNaN(date.getTime())) {
      timestamp = getTimestamp(date);
    } else {
      timestamp = { error: "invalid date" };
    }
  }
  res.json(timestamp);
});

const listener = app.listen(process.env.port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
