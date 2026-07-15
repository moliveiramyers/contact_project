import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Conatact API documentation',
        version: '1.0.0'
    },

    host: process.env.RENDER_EXTERNAL_URL 
        ? process.env.RENDER_EXTERNAL_URL.replace(/^https?:\/\//, '') 
        : 'localhost:3000',
    schemes: process.env.RENDER_EXTERNAL_URL ? ['https'] : ['http']
};

const outputFile = './swagger.json';

const endpointsFiles = ['./server.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);