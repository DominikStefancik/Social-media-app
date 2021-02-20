import * as express from 'express';
import * as cors from 'cors';

const app: express.Express = express();

app.use(cors());

app.get('/', (request, response) => response.send('Server is running!'));

app.listen(8080, () => {
  console.log('Now listening for requests on port 8080');
});

export default app;
