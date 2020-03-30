import * as metaData from '../../constants/entities';
import * as actionTypes from '../../constants/actionTypes';
import { AppActions } from '../actions';

export interface IAppState {
	users: metaData.IUserMetaData[];
	industries: string[];
	names: any[];
}

const initialState: IAppState = {
	users: [],
	industries: [],
	names: []
};

export const users = (state: IAppState = initialState, action: AppActions): IAppState => {
	if (action.type === actionTypes.SET_USER) {
		return {
			...state,
			users: action.payload
		};
	}
	return { ...state };
};

export const industries = (state: IAppState = initialState, action: AppActions): IAppState => {
	if (action.type === actionTypes.SET_INDUSTRIES && action.payload) {
		let industries: string[] = [];
		for (let i = 0; i < action.payload.length; ++i) {
			const industry = action.payload[i].industry as string;
			if (industry && industries.indexOf(industry) === -1) industries.push(industry);
		}
		return {
			...state,
			industries: industries
		};
	}
	return { ...state };
};

export const names = (state: IAppState = initialState, action: AppActions): IAppState => {
	if (action.type === actionTypes.SET_NAMES) {
		const formattedNames = action.payload.filter((el) => el.first_name || el.last_name).map((el) => {
			return { value: el.id, text: formatName(el) };
		});
		return {
			...state,
			names: formattedNames
		};
	}
	return { ...state };
};

const formatName = (obj: metaData.IUserMetaData): string => {
	let formatName = [];
	if(obj.first_name) formatName.push(obj.first_name + ' ')
	if(obj.last_name) formatName[0] = formatName + obj.last_name

	return formatName[0]
}