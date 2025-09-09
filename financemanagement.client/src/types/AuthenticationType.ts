export type LoginRequest = {
    email : string,
    password: string
}

export type SignupRequest = {
    Username : string,
    Email : string,
    Password: string
}

export type LoginResponse = {
    UserId : string,
    Username : string,
    Message : string
}