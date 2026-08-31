import express from 'express';

import { router as routerFromdoctors } from './doctors/end-points.js';

const router = express.Router();

router.use("/doctors", routerFromdoctors);

export { router };