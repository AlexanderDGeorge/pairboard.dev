import { DevSchema, DevPublicProfile } from '../Devs/devSchema';
import { firestore } from '../firebase';

export async function isUsernameAvailable(
    username: DevPublicProfile['username'],
) {
    try {
        const devsRef = await firestore()
            .collectionGroup('profile')
            .where('username', '==', username)
            .get();
        return devsRef.empty;
    } catch (err) {
        console.error(err);
    }
}

export async function validateUsername(
    newUsername: DevPublicProfile['username'],
    oldUsername: DevPublicProfile['username'],
    error: { [key: string]: string },
) {
    if (!newUsername) {
        error.username = 'required';
    } else if (
        !newUsername.match(
            /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        )
    ) {
        error.username = 'invalid username';
    } else if (
        oldUsername !== newUsername &&
        !(await isUsernameAvailable(newUsername))
    ) {
        error.username = 'this username is already in use';
    }
}

export async function validateEmail(
    email: DevSchema['user']['email'],
    errors: { [key: string]: string },
) {
    if (!email) {
        errors.email = 'required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = 'invalid email address';
    }
}
