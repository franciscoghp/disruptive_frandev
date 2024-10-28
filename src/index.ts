import app from './app.ts';
import { connectDB } from './db.ts';

connectDB();
app.listen(3000);
console.log('Listening on port 3000');

