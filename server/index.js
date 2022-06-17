import express from 'express';
import AWS from 'aws-sdk';
import meetingRouter from './routes/meetingRoute.js';
import { config } from 'dotenv';
config();
import cors from 'cors';
const PORT = +process.env.PORT;
AWS.config.credentials = new AWS.Credentials(
	process.env.ACCESS_KEY_ID,
	process.env.SECRET_ACCESS,
	null
);
const app = express();

app.use(
	cors({
		origin: '*',
	})
);
app.use('/meetings', meetingRouter);

app.listen(PORT, () => {
	console.log(`Server is Up and running on ${PORT}`);
});
