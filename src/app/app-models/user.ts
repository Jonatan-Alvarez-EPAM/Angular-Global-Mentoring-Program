/** App-wide model to handle user info. */
export interface User {
    id: string;
    token: string;
    name: {
        firstName: string;
        lastName: string;
    };
    login: string;
    password: string;
}