import * as actionTypes from '../../constants/actionTypes';
import * as metaData from '../../constants/entities';

interface ISetUserAction {
  type: actionTypes.SET_USER;
  payload: metaData.IUserMetaData[];
}

interface ISetIndustriesAction { 
  type: actionTypes.SET_INDUSTRIES;
  payload: metaData.IUserMetaData[]
}

interface ISetNamesAction { 
  type: actionTypes.SET_NAMES;
  payload: metaData.IUserMetaData[]
}

export type AppActions = 
  | ISetUserAction
  | ISetIndustriesAction
  | ISetNamesAction

export const setUser = (users: metaData.IUserMetaData[]): ISetUserAction => ({
  type: actionTypes.SET_USER,
  payload: users,
});
export const setIndustries = (data: metaData.IUserMetaData[]): ISetIndustriesAction => ({
  type: actionTypes.SET_INDUSTRIES,
  payload: data,
});

export const setNames = (users: metaData.IUserMetaData[]): ISetNamesAction => ({
  type: actionTypes.SET_NAMES,
  payload: users
})