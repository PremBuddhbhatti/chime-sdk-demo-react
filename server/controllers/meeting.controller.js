import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { config } from 'dotenv';
import { meetings } from '../data.js';
config();
AWS.config.credentials = new AWS.Credentials(
	process.env.ACCESS_KEY_ID,
	process.env.SECRET_ACCESS,
	null
);
// const chime = new AWS.Chime({ region: 'us-east-1' });
const chimeSDKMeetings = new AWS.ChimeSDKMeetings({ region: 'us-east-1' });
export const createMeeting = async (req, res, next) => {
	const { name, meeting } = req.query;
	const region = 'us-east-1';
	let result;
	if (meetings[meeting]) {
		result = meetings[meeting];
	} else {
		//Creating Meeting
		const newMeeting = await chimeSDKMeetings
			.createMeeting({
				ClientRequestToken: uuid(),
				ExternalMeetingId: meeting,
				MediaRegion: region,
				MeetingFeatures: {
					Audio: {
						EchoReduction: 'AVAILABLE',
					},
				},
			})
			.promise();
		newMeeting.Meeting.MediaPlacement['audioHostURL'] =
			newMeeting.Meeting.MediaPlacement.AudioHostUrl;
		meetings[meeting] = newMeeting.Meeting;
		result = newMeeting.Meeting;
	}

	// Creating Attendee
	const attendee = await chimeSDKMeetings
		.createAttendee({
			ExternalUserId: name,
			MeetingId: result.MeetingId,
			Capabilities: {
				Audio: 'SendReceive',
				Video: 'SendReceive',
				Content: 'SendReceive',
			},
		})
		.promise();

	//Getting Meeting Data
	const meetingData = await chimeSDKMeetings
		.getMeeting({
			MeetingId: result.MeetingId,
		})
		.promise();

	//Getting All the attendee in a Meeting

	const listAttendee = await chimeSDKMeetings
		.listAttendees({
			MeetingId: result.MeetingId,
		})
		.promise();

	res.json({
		Meeting: meetings[meeting],
		Attendee: attendee.Attendee,
	});
};

//Listing All the attandees
export const listAttendees = async (req, res, next) => {
	console.log('request came');
	const { meetingId } = req.params;
	const list = await chimeSDKMeetings
		.listAttendees({
			MeetingId: meetingId,
		})
		.promise();
	console.log(list);
};

//Delete Meeting
export const deleteMeeting = async (req, res, next) => {
	const { meetingId } = req.params;
	await chimeSDKMeetings
		.deleteMeeting({
			MeetingId: meetingId,
		})
		.promise();
	res.status(204).send('Deleted');
};

//Delete Attendee from meeting
export const deleteAttendee = async (req, res, next) => {
	const { attendeeId, meetingId } = req.params;
	await chimeSDKMeetings
		.deleteAttendee({
			AttendeeId: attendeeId,
			MeetingId: meetingId,
		})
		.promise();
	res
		.status(204)
		.send(
			`Deleting Attendee with id ${attendeeId} from meeting with id ${meetingId}`
		);
};
export const getTranscription = async (req, res, next) => {
	const { meetingId } = req.params;
	const transcription = await chimeSDKMeetings
		.startMeetingTranscription({
			MeetingId: meetingId,
			TranscriptionConfiguration: {
				EngineTranscribeSettings: {
					LanguageCode: 'en-US',
					Region: 'us-east-1',
					PartialResultsStability: 'medium',
				},
			},
		})
		.promise();
	res.json(transcription);
};
