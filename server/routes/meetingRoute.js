import express from 'express';
import { createAttendee } from '../controllers/attendee.controller.js';
import {
	createMeeting,
	deleteAttendee,
	deleteMeeting,
	getTranscription,
	listAttendees,
	getMediaRecordingsPipeline,
} from '../controllers/meeting.controller.js';

import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials(
	process.env.ACCESS_KEY_ID,
	process.env.SECRET_ACCESS,
	null
);

const meetingRouter = express.Router();

meetingRouter.get('/:meetingId', (req, res, next) => {
	const { meetingId } = req.params;
	res.send(`Getting The details about Meeting with ID ${meetingId}`);
});

meetingRouter.delete('/:meetingId', deleteMeeting);

meetingRouter.post('/:meetingId/attendees', createAttendee);

meetingRouter.get('/:meetingId/attendees', listAttendees);

meetingRouter.get('/:meetingId/attendees/:attendeeId', (req, res, next) => {
	const { meetingId, attendeeId } = req.params;
	res.send(`Getting detail of Attendee ${attendeeId} in meeting ${meetingId}`);
});

meetingRouter.post('', createMeeting);

meetingRouter.delete(
	'/:meetingId/attendees/:attendeeId',
	deleteAttendee /* (req, res, next) => {
	const { attendeeId, meetingId } = req.params;
	res.send(
		`Deleting Attendee with id ${attendeeId} from meeting with id ${meetingId}`
	);
} */
);

meetingRouter.get('/:meetingId/transcription', getTranscription);
meetingRouter.get(
	'/:meetingId/startMediaRecording',
	getMediaRecordingsPipeline
);
export default meetingRouter;
