import { DevSchema } from '../Devs/devSchema';
import { auth, firestore, githubProvider } from '../firebase';

export interface SignUpValues {
    username: string;
    name: string;
    email: string;
    password: string;
}

export async function loginWithGithub() {
    try {
        const { user } = await auth.signInWithPopup(githubProvider);
        // [TODO]: handle if no user doc (needs to signup)
        if (user) {
            console.log(user);
        } else {
            // handle error
        }
    } catch (error) {
        console.error(error.message);
    }
}

// export async function login(email: DevSchema['email'], password: string) {
//     try {
//         await auth.signInWithEmailAndPassword(email, password);
//     } catch (error) {
//         console.error(error.message);
//         return error;
//     }
// }

export function signOut() {
    // [TODO]: handle cleanup
    // cloud functions to handle users that don't explicity log out?

    auth.signOut();
}

export async function checkForValidEmail(email: string) {
    if (!email) return;
    const usersRef = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
    return usersRef.empty;
}
