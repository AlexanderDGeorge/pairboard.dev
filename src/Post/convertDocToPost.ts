import { PostSchema } from "../firebase/schema";

export default function convertDocToPost(
    doc: firebase.firestore.DocumentData
): PostSchema {
    const post = {
        id: doc.id,
        active: doc.active,
        createdAt: doc.createdAt,
        description: doc.description,
        difficulty: doc.difficulty,
        host: doc.host,
        language: doc.language,
        maxCapacity: doc.maxCapacity,
        participants: doc.participants,
        tags: doc.tags,
    };
    return post;
}
