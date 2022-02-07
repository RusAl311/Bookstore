const path = require('path');
const fs  = require('fs');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/components/App/App.less'), 'utf8'));
const SRC_DIR = path.resolve(__dirname, './src');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: SRC_DIR,
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.(png|svg|jpg|gif|woff2|woff|eot|ttf|svg)$/,
                type: 'asset/resource'
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                  }, 
                  {
                    loader: 'css-loader', // translates CSS into CommonJS
                  },
                   {
                    loader: 'less-loader', // compiles Less to CSS
                   options: {
                     lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
                       modifyVars: themeVariables,
                       javascriptEnabled: true,
                     },
                   },
                  }],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json'],
        alias: {
            images: path.resolve(__dirname, 'public/images')
        }
    },
    plugins: [
        new ForkTsCheckerPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx}',
            }
        }),
        new HtmlPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from:  path.resolve(__dirname, 'public'),
                    globOptions: { ignore: '**/*.html' },
                    noErrorOnMissing: true,
                }
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000,
    }
};