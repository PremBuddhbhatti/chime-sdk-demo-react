import {
	ContentShare,
	LocalVideo,
	RemoteVideo,
	useMeetingManager,
	useRemoteVideoTileState,
	VideoGrid,
} from 'amazon-chime-sdk-component-library-react';
import classes from './meeting.module.css';

const MeetingView = ({ children }) => {
	//Getting all the remote attendee tile state
	const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();

	const meetingManager = useMeetingManager();

	//Creating remote video elements for all the remote attendees
	const videos = tiles.map((tileId) => {
		const attendeeId = tileIdToAttendeeId[tileId];
		//Getting the external user Id for the user
		const attendee = meetingManager.audioVideo
			.getRemoteVideoSources()
			.find((ele) => {
				return ele.attendee.attendeeId === attendeeId;
			});
		return (
			<RemoteVideo
				name={attendee.attendee.externalUserId}
				tileId={tileId}
				key={tileId}
			/>
		);
	});

	return (
		<>
			<div className={classes['custom-grid']}>
				<VideoGrid layout='standard'>
					<LocalVideo nameplate='Me' />
					{/* Rendering the remote videos */}
					{videos}
					{/* This component is for content sharing */}
					<ContentShare />
				</VideoGrid>
			</div>
			{children}
		</>
	);
};

export default MeetingView;
