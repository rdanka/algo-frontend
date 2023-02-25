import { User } from "./user.model";

export interface AuthenticateResponse {
    accessToken: string;
    success: boolean;
    user: User;
}