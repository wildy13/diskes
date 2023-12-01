import 'dotenv/config';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import { connect } from 'mongoose';

import User from './user/model.js';
import setup from './auth/passport.js';

import auth from './auth/index.js';
import user from './user/index.js';
import role from './role/index.js';
import rujukanBatam from './rujukan/batam/index.js';
import rujukanProvinsi from './rujukan/provinsi/index.js';
import rumahSakitBatam from './rumahsakit/batam/index.js';
import rumahSakitProvinsi from './rumahsakit/provinsi/index.js';


const fastify = Fastify({
  logger: true,
});

setup(User);

fastify.register(fastifyCors);
fastify.register(fastifyJwt, { secret: process.env.SESSION_KEY, sign: { expiresIn: '8h' } });

fastify.addHook('onRequest', async (req, res) => {
  try {
    if (req.headers.authorization) {
      await req.jwtVerify();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

fastify.register(auth, { prefix: '/api/auth' });
fastify.register(user, { prefix: '/api/user' });
fastify.register(role, { prefix: '/api/role' });
fastify.register(rujukanBatam, { prefix: '/api/rujukan/batam' });
fastify.register(rujukanProvinsi, { prefix: '/api/rujukan/provinsi' });
fastify.register(rumahSakitBatam, { prefix: '/api/rumahsakit/batam' });
fastify.register(rumahSakitProvinsi, { prefix: '/api/rumahsakit/provinsi' });

const connector = async () => {
  try {
    await connect(process.env.DB_URL, {
      serializeFunctions: true,
    });

    console.log('Connection has been established successfully.');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT, host: process.env.HOST });
    await connector();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();