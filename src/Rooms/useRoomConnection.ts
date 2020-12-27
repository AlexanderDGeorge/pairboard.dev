import Peer from 'peerjs';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CurrentDevContext } from '../Application';

export default function useRoomConnection(open: boolean, room?: Peer) {
    const { profile } = useContext(CurrentDevContext)!;
    const [you, setYou] = useState<Peer | undefined>(undefined);
    const [roomConnection, setRoomConnection] = useState<
        Peer.DataConnection | undefined
    >(undefined);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined,
    );

    useMemo(() => {
        setYou(new Peer(profile.username));
    }, [profile.username]);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
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

    useEffect(() => {
        if (open && room && you) {
            setRoomConnection(you.connect(room.id));
            console.log(room);
        }
    }, [room, you, open]);

    useEffect(() => {
        if (roomConnection) {
            roomConnection.on('open', () => {
                roomConnection.send(`${profile.username} has joined!`);
            });
        }
    }, [roomConnection, profile.username]);

    return { you, localStream };
}
