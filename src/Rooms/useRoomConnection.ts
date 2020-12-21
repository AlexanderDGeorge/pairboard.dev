import { RoomSchema } from './roomSchema';
import Peer from 'peerjs';
import { useContext, useEffect, useState } from 'react';
import { CurrentDevContext } from '../Application';

export default function useRoomConnection(roomId: RoomSchema['id']) {
    const { profile } = useContext(CurrentDevContext)!;
    const you = new Peer(profile.username);
    const roomConnection = you.connect(roomId);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined,
    );

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 576, ideal: 720, max: 1080 },
                    facingMode: 'user',
                    aspectRatio: 1280 / 720,
                },
            })
            .then((stream) => {
                setLocalStream(stream);
            });
    }, []);

    roomConnection.on('open', () => {
        roomConnection.send(`${profile.username} has joined the room.`);
    });

    roomConnection.on('connection', () => {
        console.log('here');
    });

    roomConnection.on('data', (data) => {
        console.log(data);
    });

    you.on('open', (id) => {
        console.log(id);
    });

    you.on('call', (call) => {
        call.answer(localStream);
    });

    return { you, localStream };
}
