const attendee = {
    ExternalUserId: 'Parag',
    AttendeeId: 'a8568ea8-72f1-1e69-73c0-372c80246b94',
    JoinToken: 'YTg1NjhlYTgtNzJmMS0xZTY5LTczYzAtMzcyYzgwMjQ2Yjk0OjVhYjZmNTE0LTQ2MjktNGFmOC05YTZjLWM4NDNjY2IxYWNhMw',
    Capabilities: {
        Audio: 'SendReceive',
        Video: 'SendReceive',
        Content: 'SendReceive'
    }
}
const meeting = {
    MeetingId: 'bdfd5dcf-f4d1-4539-aca3-874dfc6d2713',
    MeetingHostId: null,
    ExternalMeetingId: 'Temp',
    MediaRegion: 'us-east-1',
    MediaPlacement: {
        AudioHostUrl: 'cfb95e2544208c1ead6c4ce075066ca6.k.m3.ue1.app.chime.aws:3478',
        AudioFallbackUrl: 'wss://haxrp.m3.ue1.app.chime.aws:443/calls/bdfd5dcf-f4d1-4539-aca3-874dfc6d2713',
        SignalingUrl: 'wss://signal.m3.ue1.app.chime.aws/control/bdfd5dcf-f4d1-4539-aca3-874dfc6d2713',
        TurnControlUrl: 'https://2713.cell.us-east-1.meetings.chime.aws/v2/turn_sessions',
        ScreenDataUrl: 'wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/bdfd5dcf-f4d1-4539-aca3-874dfc6d2713',
        ScreenViewingUrl: 'wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=bdfd5dcf-f4d1-4539-aca3-874dfc6d2713',
        ScreenSharingUrl: 'wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/bdfd5dcf-f4d1-4539-aca3-874dfc6d2713',
        EventIngestionUrl: 'https://data.svc.ue1.ingest.chime.aws/v1/client-events'
    },
    MeetingFeatures: { Audio: { EchoReduction: 'AVAILABLE' } },
    PrimaryMeetingId: null
}

export { attendee, meeting }