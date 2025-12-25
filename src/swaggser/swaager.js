const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const setupSwagger = (app) => {
  const option = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "VANCHAY",
        version: "1.0.0",
      },
      //Verify Token
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            in: "header",
            name: "Authorization",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    apis: [path.join(__dirname, "../routes/*.js")],
    // apis: ['../routes/*.js']
  };
  const openAPI = swaggerJSDoc(option);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPI));
};
module.exports = { setupSwagger };
