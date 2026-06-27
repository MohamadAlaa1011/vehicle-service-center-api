import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, RefreshTokenDto, UpdateProfileDto, AuthResponseDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto, user: User): Promise<AuthResponseDto>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User>;
}
