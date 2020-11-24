import { PostSchema } from "../../firebase/schema";

export default function convertDocToPost(
    doc: firebase.firestore.DocumentData
): PostSchema {
    const post = {
        id: doc.id,
        createdAt: doc.createdAt,
        description: doc.description,
        difficulty: doc.difficulty,
        eventEnd: doc.eventEnd,
        eventStart: doc.eventStart,
        host: doc.host,
        language: doc.language,
        maxCapacity: doc.maxCapacity,
        participants: doc.participants,
        title: doc.title,
        type: doc.type,
    };
    return post;
}
