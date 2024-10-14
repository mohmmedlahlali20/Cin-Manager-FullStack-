const minio = require('minio')
require('dotenv').config(); 
 

const minioClient = new minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY ,
    secretKey: process.env.MINIO_SECRET_KEY,
})