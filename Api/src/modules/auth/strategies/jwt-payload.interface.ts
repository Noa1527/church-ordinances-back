export interface JwtPayload {
    email: string;
    sub: string;
    isAdmin: boolean;
    regions: string;
}
