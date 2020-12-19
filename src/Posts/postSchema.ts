import { firestore } from 'firebase';
import { DevPublicProfile } from '../Devs/devSchema';

export interface PostSchema {
    id: firestore.DocumentReference['id'];
    created_at: Date;
    created_by: DevPublicProfile;
    occupants: DevPublicProfile[];
    subscribers: DevPublicProfile['uid'][];
    roomId: firestore.DocumentReference['id'];
    title: string;
    description: string;
    difficulty: typeof DIFFICULTIES[number];
    image_url?: string;
    language: typeof LANGUAGES[number];
    start_date: Date;
    type: typeof POSTTYPES[number];
}

export interface PostUpdateSchema {
    max_capacity: number;
    title: string;
    description: string;
    difficulty: typeof DIFFICULTIES[number];
    image_url?: string;
    language: typeof LANGUAGES[number];
    start_date: Date;
    type: typeof POSTTYPES[number];
}

export const LANGUAGES = [
    'Any',
    'C',
    'C++',
    'C#',
    'Dart',
    'Elm',
    'Erlang',
    'Go',
    'HTML/CSS',
    'Java',
    'JavaScript',
    'Kotlin',
    'Objective-C',
    'Octave (MATLAB)',
    'Perl',
    'PHP',
    'Python',
    'R',
    'Ruby',
    'SQL',
    'Swift',
    'TypeScript',
    'Visual Basic',
    'Other',
] as const;

export const DIFFICULTIES = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert',
] as const;

export const POSTTYPES = ['Pairboard', 'Team', 'Lecture'] as const;
