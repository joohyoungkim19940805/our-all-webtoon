export interface GoogleProviderInfo {
    email: string;
    profileImageUrl: string;
}
export interface Account {
    deviceId: string;
    accountName: string;
    age: number;
    createAt: string;
    email: string;
    gender: string;
    isEnabled: boolean;
    nickname: string;
    profileImage: string;
    providerId: string;
    username: string;
    googleProviderInfo: GoogleProviderInfo;
    roles: Array<
        | 'ROLE_MASTER'
        | 'ROLE_USER'
        | 'ROLE_WRITER'
        | 'ROLE_GUEST'
        | 'ROLE_BOT'
        | 'ROLE_APP'
    >;
}
