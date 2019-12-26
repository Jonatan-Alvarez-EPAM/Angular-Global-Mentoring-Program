/** App-wide model to handle courses info. */
export interface Course {
    id: string;
    name: string;
    date: Date;
    length: number;
    description: string;
    isTopRated: boolean;
}
