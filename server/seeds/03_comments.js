const comments = require('../lib/comments')

exports.seed = (knex, Promise) => {
  return knex('comment').del()
    .then(() => {
      return knex('comment').insert(comments)
    })
    // .then(() => {
    //   return knex.raw('ALTER SEQUENCE comment_id_seq RESTART WITH 4;')
    // })
}
