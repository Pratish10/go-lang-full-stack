export type ApiResponse<T = any> = {
    success: boolean;
    data: T;
    message: string;
    error: string
}

export type UserPayload = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}