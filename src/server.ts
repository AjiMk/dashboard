import app from "./app";
import config from "./config/config";

const PORT: number = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
