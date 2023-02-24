import swaggerAutogen from "swagger-autogen";
const outputFIle = "./src/swagger/swagger_output.json";
const endpoitsFiles = [
  "./src/routes/users.routes.ts",
  "./src/routes/announcements.routes.ts",
  "./src/routes/comments.routes.ts",
  "./src/routes/bids.routes.ts",
  "./src/routes/address.routes.ts",
];
swaggerAutogen(outputFIle, endpoitsFiles);
