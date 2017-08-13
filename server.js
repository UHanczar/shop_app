const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

app.use('/', express.static(__dirname));

app.listen(app.get('port'), () => console.log('Server started: http://localhost:' + app.get('port') + '/'));