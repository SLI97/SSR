const fs = require("fs");
const path = require("path");
const express = require('express')
const app = express()

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("./dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/client/vue-ssr-client-manifest.json");

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

app.use('/js', express.static('./dist/client/js'));
app.use('/css', express.static('./dist/client/css'));

app.get('/api/:id', (req, res) => {
  const { id } = req.params
  const result = {
    code: 200,
    data: id,
    msg: '请求成功'
  }
  res.setHeader("Content-Type", "application/json;charsetutf-8")
  res.setHeader("Server", "Sli97")
  res.json(result);
  res.end()
})


app.get('/api1', (req, res) => {
  console.log(req.params)
  const { id } = req.params
  console.log(id)
  res.setHeader("Content-Type", "application/json;charset:utf-8")
  res.setHeader("Server", "Sli97")
  res.send(id)
})

app.get('*', async (req, res) => {
  const context = { url: req.url, title: "Hello SSR", }

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


/*服务启动*/
const port = 3000;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});