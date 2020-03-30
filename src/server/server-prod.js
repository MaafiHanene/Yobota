import app, { HTML_FILE } from './server';

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to ${PORT}....`);
  // eslint-disable-next-line no-console
  console.log('Press Ctrl+C to quit.');
});
