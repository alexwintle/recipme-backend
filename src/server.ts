import { createApp } from "./app";
import { initializeDb } from "./config/mongoClient";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  try {
    await initializeDb(); 
    const app = createApp();

    app.get('/', (_, res) => {
      res.send('Hello from RecipMe!');
    });

    app.listen(PORT, () => {
      console.log(`🚀 RecipMe backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

bootstrap();