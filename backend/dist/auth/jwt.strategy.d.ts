import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
