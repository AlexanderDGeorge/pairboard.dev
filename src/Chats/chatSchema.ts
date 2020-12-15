import { database, firestore } from 'firebase';
import { GlobalDevSchema } from '../Devs/devSchema';

export interface ChatSchema {
    document: firestore.DocumentSnapshot;
    // exists, metadata, id, ref
    created_at: Date;
    devs: GlobalDevSchema[];
    title?: string;
    messages: database.Reference;
}
