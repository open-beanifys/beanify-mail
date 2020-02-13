'use strict'

const beanifyPlugin = require('beanify-plugin')

module.exports = beanifyPlugin((beanify, opts, done) => {
  const transporter = beanify.mail
  beanify.route({
    url: 'mail.send',
    schema: {
      ...require('./schema.json')
    }
  }, ({ body }) => {
    transporter.verify(function (err, success) {
      if (err && !success) {
        console.log(err)
      } else {
        transporter.sendMail(body, function (err, info) {
          console.log(err)
        })
      }
    })
  })
  done()
}, {
  beanify: '>=1.1.9',
  name: 'server',
  options: {
  }
})
