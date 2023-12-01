import { getAll, create, remove, update } from './controller.js';

import { isAdmin } from '../auth/service.js';

export default ((fastify, opts, done) => {
  fastify.get('/', { preHandler: [isAdmin()] }, getAll);
  fastify.post('/', { preHandler: [isAdmin()] }, create);
  fastify.put('/:id', { preHandler: [isAdmin()] }, update);
  done();
});