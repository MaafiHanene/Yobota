import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'antd/es/button/style/css';
import i18n from '../i18n';
import { setUser, setIndustries, setNames } from '../state/actions/';
import { USERS_QUERY } from '../schemas/users';
import UserTable from '../components/UserTable';

const HomePage = () => {
	const { t } = useTranslation([ 'common', 'api' ]);
	const dispatch = useDispatch();
	const { loading, error, data } = useQuery(USERS_QUERY, {
		variables: { lang: i18n.language.toUpperCase() }
	});
	if (data && data.users) {
		dispatch(setUser(data.users));
		dispatch(setIndustries(data.users));
		dispatch(setNames(data.users));
	}
	if (loading) return <p>{t('api:LOADING_MESSAGE')}</p>;
	if (error) return <p>{t('api:ERROR_MESSAGE')}</p>;
	return <UserTable />;
};

export default HomePage;
