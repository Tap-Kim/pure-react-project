const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const prod = process.env.NODE_ENV === 'production'

module.exports = {
    mode: prod ? 'production' : 'development', // 운영/개발 모드 확인
    devtool: prod ? 'hidden-source-map' : 'eval', // 운영모드 일경우 hidden-source-map 옵션을 통해 외부에서 리액트 구조를 확인할수 없음
    entry: './src/index.js',
    resolve: { // 확장자나 경로를 알아서 처리할 수 있도록 하는 옵션
        extensions: ['.js', '.jsx'],
    },
    module: { // 이 옵션에 설치한 ts-loader or babel-loader를 설정 오른쪽에서 왼쪽방향으로 적용됨
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader']
            }
        ]
    },
    output: { // 번들화 된 파일을 export할 경로와 파일명을 설정
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
    },
    plugins: [ // 설치한 플러그인을 적용하는 옵션
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}