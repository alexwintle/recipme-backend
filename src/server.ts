import app from "./app";
import { createClient } from "./config/mongoClient";

const PORT = process.env.PORT || 4000;

app.get('/', (_, res) => {
  res.send('Hello from RecipMe!');
});

const bootstrap = async () => {
  try {
    await createClient();
    app.listen(PORT, () => {
      console.log(`🚀 RecipMe backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

bootstrap();