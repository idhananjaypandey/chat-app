import jwt from "jsonwebtoken";

console.log(
  jwt.sign(
    { id: "123", username: "rider" },
    "supersecretkey"
  )
);
