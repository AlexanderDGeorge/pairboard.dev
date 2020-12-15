import { database, firestore } from 'firebase';
import { GlobalDevSchema } from '../Devs/devSchema';

export interface PostSchema {
    document: firestore.DocumentSnapshot;
    // exists, metadata, id, ref
    created_at: Date;
    max_capacity: number;
    subscribers: GlobalDevSchema;
    room: database.Reference;
}

export interface PublicPostSchema {
    // changes here need to invoke cloud functions
    // to update in (user.created_posts, user.joined_posts)
    created_by: GlobalDevSchema;
    title: string;
    description: string;
    difficulty: typeof DIFFICULTIES[number];
    image_url?: string;
    language: typeof LANGUAGES[number];
    subscribers_length: number;
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
