export enum GRADES {
    BACHELOR_1,
    BACHELOR_2,
    BACHELOR_3,
    BACHELOR_4,
    MASTER_1,
    MASTER_2,
    MASTER_3,
    POSTGRADUATE_1,
    POSTGRADUATE_2,
    POSTGRADUATE_3
}

export type User = {
    username: string;
    name: string;
    surname: string;
    email: string;
    about: string;
    socials: {
        telegram: string | null;
        github: string | null;
    };
    grade: GRADES | null;
    technologies: [string];
    projects: [Project];
}

export type Project = {
    title: string;
    description: string;
    tags: [string];
    collaborators: [User];
}