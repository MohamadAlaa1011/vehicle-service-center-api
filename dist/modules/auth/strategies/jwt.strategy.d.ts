import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userRepository;
    constructor(configService: ConfigService, userRepository: Repository<User>);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
