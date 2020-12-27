import Peer from 'peerjs';
import { useContext, useEffect, useState } from 'react';
import { CurrentDevContext } from '../Application';
import { PostSchema } from '../Posts/postSchema';

export default function useHostDuties(post: PostSchema) {
    const { profile } = useContext(CurrentDevContext)!;
    const [room, setRoom] = useState<Peer | undefined>(undefined);
    const [open, setOpen] = useState(false);

    function handleRoomListeners(room: Peer) {
        room.on('open', (id) => {
            console.log(id);
            setOpen(true);
        });

        room.on('connection', (connection) => {
            console.log(connection);
            connection.on('data', (data) => {
                console.log(data);
            });
        });
    }

    useEffect(() => {
        if (post.host.uid === profile.uid) {
            setRoom(new Peer(post.id));
        }
    }, [post, profile]);

    useEffect(() => {
        if (room) {
            handleRoomListeners(room);
        }

        return () => {
            setOpen(false);
            room?.destroy();
        };
    }, [room]);

    return { room, open };
}
