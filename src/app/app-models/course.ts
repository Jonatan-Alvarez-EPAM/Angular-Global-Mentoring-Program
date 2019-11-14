/** App-wide model to handle courses info. */
export interface Course {
    id: string;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;
}
