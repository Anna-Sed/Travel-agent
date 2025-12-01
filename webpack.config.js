const path = require('path');

const config = {
    mode: 'production', // режим работы webpack - продакшн
    entry: {  // точки входа для сборки
        index: './src/js/index.js',
        // contacts: './src/js/contacts.js',
        // about: './src/js/about.js',
    },
    output: {
        path: path.resolve(__dirname, 'docs/js'),
        filename: '[name].bundle.js', // в [name] - это placeholder, сюда будет попадать имя файла в зависимости от файла js
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // здесь указываются модули, которые мы подключили для обработки стилей
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ],
    },
};

module.exports = config;
