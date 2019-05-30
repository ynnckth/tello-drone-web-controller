import {Request, Response, Router} from 'express';

const router = Router();

// TODO: configure to serve the static built frontend
// https://stackoverflow.com/questions/53234140/react-expressjs-backend-cant-serve-static-frontend
router.get('/', (req: Request, res: Response) => {
  res.send('nothing to see here');
});

export default router;
