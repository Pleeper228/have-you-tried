const express = require('express')
const router = express.Router()
const queries = require('../db/friendQueries')
const knex = require('../db/database-connection')

function isValidId(request, response, next) {
	!isNaN(request.params.id) ?
		next() :
		next(new Error('Invalid ID'))
}

router.get('/', (request, response) => {
	return queries.list().then(friends => response.json(friends))
})

router.get('/:id', isValidId, (request, response) => {
	return queries.read(request.params.id)
		.then(friend => {
			if (friend) {
				return response.json(friend)
			} else {
				return response.status(404).send({
					message: 'Friend not found!'
				})
			}
		})
})

router.post('/', (request, response, next) => {
		return queries.create(request.body).then(friend => response.json(friend[0]))
})

router.put('/:id', isValidId, (request, response, next) => {
	queries.update(request.params.id, request.body)
		.then(friend => response.json(friend[0]))
})

router.delete('/:id', isValidId, (request, response) => {
	return queries.delete(request.params.id).then(() => {
		return response.json({
			message: 'Friend removed from your list!'
		})
	})
})

module.exports = router
