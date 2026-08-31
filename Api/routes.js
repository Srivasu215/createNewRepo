import express from 'express';

import { router as routerFromV1 } from './V1/routes.js';

const router = express.Router();

router.use("/V1", routerFromV1);

export { router };