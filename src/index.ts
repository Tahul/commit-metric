/**
 * IMPORTS
 */
import * as express from 'express';
import * as dotenv from 'dotenv';

/**
 * INIT
 */
dotenv.config();

/**
 * CONSTANTS
 */
const app: express.Application = express();

/**
 * ROUTES
 */
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    test: 1,
  });
});

/**
 * SERVER CREATION
 */
app.listen(3005, () => {
  console.log('Commit Metric is running!');
});
