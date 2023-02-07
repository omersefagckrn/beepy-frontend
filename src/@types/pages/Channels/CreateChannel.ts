import { NavigateFunction } from 'react-router-dom';
import { ICategories } from '../../reducers/auth';

export type CreateChannelProps = {
	navigate: NavigateFunction;
};

export type CreateChannelStates = {
	stepPage: number;
	categories: ICategories[];
	selectedCategory: ICategories | null;
	channelCategory: string | null;
	title: string;
	description: string;
	channelType: 'Private' | 'Public' | null;
	files: (File & { preview: string })[];
};
