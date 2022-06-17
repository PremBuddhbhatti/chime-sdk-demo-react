import {
	LocalVideo,
	RemoteVideos,
	useLocalVideo,
	useRemoteVideoTileState,
	VideoGrid,
} from 'amazon-chime-sdk-component-library-react';
import classes from './meeting.module.css';

const fluidStyles = `
    height: 100%;
    width: 100%;
  `;

const staticStyles = `
    display: flex;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 20vw;
    max-height: 30vh;
    height: auto;
  
    video {
      position: static;
    }
  `;

export const GalleryVideoTileGrid = ({ children }) => {
	const { tiles } = useRemoteVideoTileState();
	console.log(tiles);
	const { isVideoEnabled, setIsVideoEnabled } = useLocalVideo();
	setIsVideoEnabled(true);
	console.log(isVideoEnabled);
	const gridSize = isVideoEnabled ? tiles.length + 1 : tiles.length;
	return (
		<>
			<VideoGrid
				size={gridSize}
				layout='standard'
				className={classes['custom-grid']}
			>
				<RemoteVideos />
				<LocalVideo
					nameplate='Me'
					css={gridSize > 1 ? fluidStyles : staticStyles}
				/>
			</VideoGrid>
			{children}
		</>
	);
};

export default GalleryVideoTileGrid;
