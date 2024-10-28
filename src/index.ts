import app from './app.ts';
import { connectDB } from './db.ts';

connectDB();
app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);

