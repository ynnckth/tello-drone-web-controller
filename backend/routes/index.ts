import {Request, Response, Router} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('nothing to see here');
});

export default router;
