import {Request, Response, Router} from 'express';

const router = Router();

// TODO: configure to serve the static built frontend
router.get('/', (req: Request, res: Response) => {
  res.send('nothing to see here');
});

export default router;
