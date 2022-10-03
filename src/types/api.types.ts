
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    Admin = "Admin",
    Moderator = "Moderator",
    User = "User"
}

export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface IMutation {
    register(user: CreateUserInput): boolean | Promise<boolean>;
}

export interface IQuery {
    getAllUsers(): User[] | Promise<User[]>;
    getUser(): User | Promise<User>;
    login(user: LoginUserInput): TokensObject | Promise<TokensObject>;
    refreshTokens(refreshToken: string): TokensObject | Promise<TokensObject>;
    rootQuery(): string | Promise<string>;
}

export interface TokensObject {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    createdAt: DateTime;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    role: Role;
    updatedAt: DateTime;
}

export type DateTime = any;
type Nullable<T> = T | null;
