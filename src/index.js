
const createApp = require('./app.js')
const port = process.env.PORT || 3000;

const app =createApp();

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
