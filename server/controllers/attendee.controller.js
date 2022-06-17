export const createAttendee = (req, res, next) => {
	const body = {
		Capabilities: {
			Audio: 'SendReceive',
			Content: 'SendReceive',
			Video: 'SendReceive',
		},
		ExternalUserId: 'Parag',
	};
	res.send('Creating Attendee');
};
