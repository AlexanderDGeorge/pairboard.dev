import { PostSchema } from "../../firebase/schema";

export default function convertDocToPost(
    doc: firebase.firestore.DocumentData
): PostSchema {
    const post = {
        id: doc.id,
        active: doc.active,
        author: doc.author,
        createdAt: doc.createdAt,
        description: doc.description,
        difficulty: doc.difficulty,
        eventEnd: doc.eventEnd,
        eventStart: doc.eventStart,
        host: doc.host,
        language: doc.language,
        maxCapacity: doc.maxCapacity,
        participants: doc.participants,
        password: doc.password,
        title: doc.title,
        type: doc.type,
    };
    return post;
}
