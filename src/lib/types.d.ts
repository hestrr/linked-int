export enum GRADES {
	BACHELOR_1 = '1st year bachelor',
	BACHELOR_2 = '2nd year bachelor',
	BACHELOR_3 = '3rd year bachelor',
	BACHELOR_4 = '4th year bachelor',
	MASTER_1 = '1st year master',
	MASTER_2 = '2nd year master',
	MASTER_3 = '3rd year master',
	POSTGRADUATE_1 = '1st year postgrad',
	POSTGRADUATE_2 = '2nd year postgrad',
	POSTGRADUATE_3 = '3rd year postgrad'
}

export type User = {
	username: string;
	name: string;
	surname: string;
	email: string;
	about: string;
	year: string;
	tags: string[];
	projects: Project[];

	telegramLink: string;
	githubLink: string;
	behanceLink: string;
};

export type Project = {
	title: string;
	description: string;
	tags: [string];
	collaborators: [User];
};
