import { User } from 'firebase';

export interface DevSchema {
    user: User;
    settings: DevSettings;
    profile: DevPublicProfile;
    roomId?: string;
    token?: string;
}

export interface DevPublicProfile {
    uid: User['uid'];
    image_url: string;
    connections: DevPublicProfile[];
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
