import { PostSchema } from "../../firebase/schema";

export default function convertDocToPost(
    doc: firebase.firestore.DocumentData
): PostSchema {
    const post = {
        id: doc.id,
        createdAt: doc.createdAt,
        description: doc.description,
        difficulty: doc.difficulty,
        host: doc.host,
        language: doc.language,
        maxCapacity: doc.maxCapacity,
        participants: doc.participants,
        start: doc.start,
        title: doc.title,
        type: doc.type,
    };
    return post;
}
