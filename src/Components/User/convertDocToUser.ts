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
        emailVerified: doc.emailVerified,
        firstname: doc.firstname,
        githubURL: doc.githubURL,
        lastname: doc.lastname,
        linkedInURL: doc.linkedInURL,
        location: doc.location,
        photoURL: doc.photoURL,
        postId: doc.postId,
        posts: doc.posts,
        score: doc.score,
        status: doc.status,
        username: doc.username,
    };
    return user;
}
