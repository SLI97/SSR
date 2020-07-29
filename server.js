const Vue = require('vue')
const app = require('express')()
// const createApp = require('./app')
const renderer = require('vue-server-renderer').createRenderer()

// const template = require('fs').readFileSync('./index.template.html', 'utf-8');
// const renderer = require('vue-server-renderer').createRenderer({
//     template,
// });

// const context = {
//     title: 'vue ssr',
//     meta: `
//         <meta name="keyword" content="vue,ssr">
//         <meta name="description" content="vue srr demo">
//     `,
// };


// app.get('*', (req, res) => {
//     const context = { url: req.url }
//     const app = createApp(context)
//     // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
//     res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

//     // const app = new Vue({
//     //     data: {
//     //         url: req.url
//     //     },
//     //     template: `<div>访问的 URL 是： {{ url }}</div>`
//     // })

//     renderer.renderToString(app, context, (err, html) => {
//         if (err) {
//             console.log(err)
//             res.status(500).end('Internal Server Error')
//             return
//         }
//         res.end(html);
//     })
// })

const createApp = require('/path/to/built-server-bundle.js')

app.get('*', (req, res) => {
  const context = { url: req.url }

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  })
})


const server = app.listen(8080, () => {
    const host = server.address().address
    const port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})