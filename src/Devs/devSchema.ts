import { User } from 'firebase';
import { PublicPostSchema } from '../Posts/postSchema';

export interface DevSchema {
    // propagate changes through cloud functions
    user: User;
    settings: DevSettings;
    joined_posts: PublicPostSchema;
    created_posts: PublicPostSchema;
    username: string;
    image_url: string;
    connections: DevPublicProfile[];
    bio?: string;
    name?: string;
    email?: string;
    location?: string;
    github_url?: string;
    linkedIn_url?: string;
    personal_url?: string;
}

export interface DevPublicProfile {
    uid: User['uid'];
    image_url: string;
    connections: DevSchema[];
    username: string;
    bio?: string;
    name?: string;
    email?: string;
    location?: string;
    github_url?: string;
    linkedIn_url?: string;
    personal_url?: string;
}

export interface DevSettings {
    dark_mode: 'auto' | 'light' | 'dark';
    public_email: boolean;
    public_name: boolean;
    public_links: boolean;
}
