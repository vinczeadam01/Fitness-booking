const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({
    uploadDir: './src/public/upload'
});

export default multipartMiddleware;