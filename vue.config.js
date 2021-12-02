module.exports = {
    // devServer: {
    //     port: 8080,
    //     open: true,
    //     proxy: {
    //         "/api": {
    //             target:"http://127.0.0.1:3000/",
    //             ws: true,
    //             changOrigin: true,
    //             pathRewrite: {                  //格式
    //                 "^/api": '/'
    //             }
    //         }
    //     },
        

    // },
    publicPath: '/',
	/* 修改html标题 */
	chainWebpack: config => {
		config.plugin('html')
			.tap(args => {
				console.log(args);
				args[0].title = "桃李教育平台";
				return args;
			})
	}


}