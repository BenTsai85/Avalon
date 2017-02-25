import { Router } from 'express';
import path from 'path';
import assert from 'assert';

const returnRouter = function ( io ) {
	const router = new Router();
  	return router;
};

module.exports = returnRouter;
