/** App-wide model to handle user info. */
export interface User {
    id: string;
    token: string;
    name: {
        firstName: string;
        lastName: string;
        first: string; // Here for backend compatibility
        last: string; // Here for backend compatibility
    };
    login: string;
    password: string;
}