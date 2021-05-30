import express from 'express';
import cors from 'cors';
import { handleRouteError } from '../handlers';

const router: express.Router = express.Router();

router.use(cors());

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(handleRouteError);

export default router;
