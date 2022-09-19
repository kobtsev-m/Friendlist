
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    register(user: CreateUserInput): string | Promise<string>;
}

export interface IQuery {
    getAllRoles(): Role[] | Promise<Role[]>;
    getAllUsers(): User[] | Promise<User[]>;
    getUser(): User | Promise<User>;
    login(user: LoginUserInput): string | Promise<string>;
    rootQuery(): string | Promise<string>;
}

export interface Role {
    description: string;
    id: string;
    users: User[];
    value: string;
}

export interface User {
    createdAt: DateTime;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    roles: Role[];
    updatedAt: DateTime;
}

export type DateTime = any;
type Nullable<T> = T | null;
