import { DevPublicProfile } from '../Devs/devSchema';
import { PostSchema } from '../Posts/postSchema';

export interface RoomSchema {
    id: PostSchema['id'];
    admins: DevPublicProfile['uid'][];
    occupants: DevPublicProfile[];
    // do not need to sync with profile updates
}
