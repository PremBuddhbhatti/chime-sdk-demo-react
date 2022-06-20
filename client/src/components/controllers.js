import {
	Camera,
	ControlBar,
	ControlBarButton,
	LeaveMeeting,
	Microphone,
	Phone,
	ScreenShare,
	Clear,
	Pause,
	Play,
	useLocalVideo,
	Record,
} from 'amazon-chime-sdk-component-library-react';
import { useState } from 'react';

export const Controllers = ({ meetingManager }) => {
	//Different states to handle the behaviors
	const [muted, setMuted] = useState(false);
	const [screenShared, setScreenShared] = useState(false);
	const [pauseContentShare, setPauseContentShare] = useState(false);
	const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo();
	// const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();
	/* let attendees =
		meetingManager.audioVideo.realtimeSubscribeToAttendeeIdPresence(); */
	const microphoneButtonProps = {
		icon: muted ? <Microphone muted /> : <Microphone />,
		onClick: () => {
			console.warn(meetingManager);
			setMuted(!muted);
			if (!muted) {
				meetingManager.audioVideo.realtimeMuteLocalAudio();
			} else {
				meetingManager.audioVideo.realtimeUnmuteLocalAudio();
			}
		},
		label: 'Mute',
	};
	const mediaCaptureButtonProps = {
		icon: <Record />,
		onClick: () => {
			console.warn('recording');
		},
		label: 'Record',
	};

	const cameraButtonProps = {
		icon: isVideoEnabled ? <Camera /> : <Camera disabled />,
		onClick: async () => {
			if (isVideoEnabled) {
				setIsVideoEnabled(false);
			} else {
				setIsVideoEnabled(true);
			}
		},
		label: 'Camera',
	};

	const pauseButtonProps = {
		icon: pauseContentShare ? <Play /> : <Pause />,
		onClick: () => {
			console.log('Pause Button Clicked');

			if (!pauseContentShare) {
				setPauseContentShare((state) => true);
				meetingManager.audioVideo.pauseContentShare();
			} else {
				setPauseContentShare((state) => false);
				meetingManager.audioVideo.unpauseContentShare();
			}
		},
		label: 'Pause',
	};

	const hangUpButtonProps = {
		icon: <Phone />,
		onClick: async () => {
			const response = await fetch(
				`http://localhost:3000/meetings/${meetingManager.meetingId}`,
				{
					method: 'DELETE',
				}
			);
			console.log(response.status);
			if (response.status === 204) {
				console.log('Ending Meeting');
			}
		},
		label: 'End',
	};

	const leaveMeetingButtonProps = {
		icon: <LeaveMeeting />,
		onClick: async () => {
			meetingManager.audioVideo.stopLocalVideoTile();
			meetingManager.audioVideo.stop();
			meetingManager.leave();
			alert('You have left the meeting');
			console.log('Leaving Meeting');
			console.log(
				'Left',
				meetingManager.meetingSessionConfiguration.credentials
			);
		},
		label: 'Leave',
	};

	const screenShareButtonProps = {
		icon: screenShared ? <Clear /> : <ScreenShare />,
		onClick: () => {
			console.log('Screen button clicked');
			if (!screenShared) {
				setScreenShared((state) => true);
				meetingManager.audioVideo.startContentShareFromScreenCapture();
			} else {
				setScreenShared((state) => false);
				meetingManager.audioVideo.stopContentShare();
			}
		},
		label: 'Share',
	};

	return (
		<ControlBar showLabels layout='bottom'>
			<ControlBarButton {...microphoneButtonProps} />
			<ControlBarButton {...cameraButtonProps} />
			{/* <ControlBarButton {...dialButtonProps} /> */}
			<ControlBarButton {...mediaCaptureButtonProps} />
			<ControlBarButton {...screenShareButtonProps} />
			<ControlBarButton {...hangUpButtonProps} />
			<ControlBarButton {...leaveMeetingButtonProps} />
			{screenShared && <ControlBarButton {...pauseButtonProps} />}
		</ControlBar>
	);
};
