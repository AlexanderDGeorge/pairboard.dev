import { UserSchema } from "../../firebase/schema";

export default function convertDocToUser(
    doc: firebase.firestore.DocumentData
): UserSchema {
    const user = {
        uid: doc.uid,
        blurb: doc.blurb,
        connections: doc.connections,
        darkMode: doc.darkMode,
        email: doc.email,
        emailPublic: doc.emailPublic,
        emailVerified: doc.emailVerified,
        githubURL: doc.githubURL,
        linkedInURL: doc.linkedInURL,
        location: doc.location,
        name: doc.name,
        personalURL: doc.personalURL,
        photoURL: doc.photoURL,
        postId: doc.postId,
        posts: doc.posts,
        score: doc.score,
        status: doc.status,
        username: doc.username,
    };
    return user;
}
