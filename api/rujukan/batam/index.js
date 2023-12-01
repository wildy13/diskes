import { getAll, create, remove,  update } from './controller.js';

import { isAuthenticated } from '../../auth/service.js';

export default ((fastify, opts, done) => {
  fastify.get('/', { preHandler: [isAuthenticated()] }, getAll);
  fastify.post('/', { preHandler: [isAuthenticated()] },  create);
  fastify.post('/remove', { preHandler: [isAuthenticated()] }, remove);
  fastify.put('/:id', { preHandler: [isAuthenticated()] }, update);
  done();
});