const fs = require("fs");
const path = require("path");
const express = require('express')
const app = express()

const {createBundleRenderer} = require("vue-server-renderer");
const serverBundle = require("./dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/client/vue-ssr-client-manifest.json");

//需要开启服务端渲染的时候，打开
const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template: fs.readFileSync(path.resolve(__dirname, "./src/index.template.html"), "utf-8"),
	clientManifest,
});

function renderToString(context) {
	return new Promise((resolve, reject) => {
		renderer.renderToString(context, (err, html) => {
			err ? reject(err) : resolve(html);
		});
	});
}

// 中间件处理静态文件请求
app.use(express.static('./dist/client', {index: false})) // 为false是不让它渲染成dist/client/index.html

app.all('/api', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.setHeader("Content-Type", "application/json;charset=utf-8")
	res.setHeader("Server", "Sli97")
	next();
});

app.get('/api/home', (req, res) => {
	const result = {
		code: 200,
		data: '我是异步获取的首页数据',
		msg: '请求成功'
	}
	res.json(result);
	res.end()
})

app.get('/api/search/:id', (req, res) => {
	const {id} = req.params
	const result = {
		code: 200,
		data: id,
		msg: '请求成功'
	}
	res.json(result);
	res.end()
})

app.post('/api/space', (req, res) => {
	const result = {
		code: 200,
		data: '我是异步获取的个人空间数据',
		msg: '请求成功'
	}
	res.json(result);
	res.end()
})

//需要开启服务端渲染的时候，打开
app.get('*', async (req, res) => {
	const context = {url: req.url, title: "Hello SSR",}
	if(req.url === 'space'){

	}

	// 将 context 数据渲染为 HTML
	const html = await renderToString(context).catch(err => {
		if (err.url) {
			res.redirect(err.url)
		} else if (err.code === 404) {
			res.status(404).send('404 | Page Not Found')
		} else {
			// Render Error Page or Redirect
			res.status(500).send('500 | Internal Server Error')
			console.error(`error during render : ${req.url}`)
			console.error(err.stack)
		}
	});
	res.send(html)
})
//

/*服务启动*/
const port = 3000;
app.listen(port, () => {
	console.log(`server started at localhost:${port}`);
});
