import { database, firestore } from 'firebase';
import { DevPublicProfile } from '../Devs/devSchema';

export interface ChatSchema {
    document: firestore.DocumentSnapshot;
    // exists, metadata, id, ref
    created_at: Date;
    devs: DevPublicProfile[];
    title?: string;
    messages: database.Reference;
}
