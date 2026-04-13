import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

const doc = {
    info: {
        title: "Management Acara API",
        description: "Documentation for Backend Acara API",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server",
        },
        {
            url: "https://back-end-acaraa.vercel.app/api",
            description: "Production Server",
        }

    ],    
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",                
            },
        },
        schemas: {
            LoginRequest: {
                identifier: "amntllhz",
                password: "12345678"
            },
            RegisterRequest: {
                fullName: "tram",
                username: "tram",
                email: "tram@gmail.com",
                password: "12345678",
                confirmPassword: "12345678"
            },
            ActivationRequest: {
                code: "abcdef"
            }
        }
    }
};

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);