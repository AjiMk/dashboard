import axios from "axios";

async function main() {
  const url = "http://localhost:3978/api/notify";
  await axios.post(url, {
    message: "Pooda",
  });

  console.log("passed!");
}

main();
