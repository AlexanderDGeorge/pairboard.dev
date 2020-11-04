import { checkForValidEmail, checkForValidUsername } from "../firebase/auth";
import { UserSchema } from "../firebase/schema";


export async function validateUsername(newUsername: UserSchema['username'], oldUsername: UserSchema['username'], error: { [key: string]: string}) {
    if (!newUsername) {
        error.username = 'required';
    } else if (!newUsername.match(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)) {
        error.username = 'invalid username'
    } else if (oldUsername !== newUsername && !(await checkForValidUsername(newUsername))) {
        error.username = 'this username is already in use'
    };
}

export async function validateEmail(newEmail: UserSchema['email'], oldEmail: UserSchema['email'], errors: {[key: string]: string}) {
    if (!newEmail) {
        errors.email = 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmail)) {
        errors.email = 'invalid email address'
    } else if(oldEmail !== newEmail && !(await checkForValidEmail(newEmail))) {
        errors.email = 'this email is already in use'
    }
}