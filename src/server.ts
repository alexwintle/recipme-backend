import app from "./app";

const PORT = process.env.PORT || 4000;

app.get('/', (_, res) => {
  res.send('Hello from RecipMe!');
});

app.listen(PORT, () => {
  console.log(`🚀 RecipMe backend running at http://localhost:${PORT}`);
});
