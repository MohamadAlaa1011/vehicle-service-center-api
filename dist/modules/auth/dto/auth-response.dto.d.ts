import { User } from '../../users/entities/user.entity';
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: User;
}
