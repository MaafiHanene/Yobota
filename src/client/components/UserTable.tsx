import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, InputNumber, AutoComplete } from 'antd';
import 'antd/es/button/style/css';
import { IAppState } from '../state/reducers/userProperties';
import * as metaData from '../constants/entities';

const HomePage = () => {
	// this could be moved to redux I suppose
	const [ selectedUser, setSelectedUser ] = useState(undefined);
	// RESOLVE THE TYPES ON THese SELECTORs
	const users = useSelector((state: any) => state.users);
	const industries = useSelector((state: any) => state.industries);
	const names = useSelector((state: any) => state.names);
	const { t } = useTranslation([ 'common', 'api' ]);
	const [ PageSize, setPageSize ] = useState(10);

	const columns = [
		{
			title: t('firstName'),
			dataIndex: 'first_name',
			key: 'first_name',
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
			width: '12.5%',
			editable: true
		},
		{
			title: t('lastName'),
			dataIndex: 'last_name',
			key: 'last_name',
			width: '12.5%',
			editable: true,
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0
		},
		{
			title: t('DOB'),
			width: '12.5%',
			dataIndex: 'date_of_birth',
			editable: true,
			key: 'dob',
			filters: [ { text: '16 - 25', value: '0' }, { text: '25 - 40', value: '1' }, { text: '40+', value: '2' } ],
			onFilter: (value: any, record: any): boolean => {
				switch (value) {
					case '0':
						return record.date_of_birth
							? new Date().getFullYear() - new Date(record.date_of_birth).getFullYear() < 25
							: false;
					case '1':
						return record.date_of_birth
							? new Date().getFullYear() - new Date(record.date_of_birth).getFullYear() < 40
							: false;
					case '2':
						return record.date_of_birth
							? new Date().getFullYear() - new Date(record.date_of_birth).getFullYear() > 40
							: false;
					default:
						return false;
				}
			},
			defaultSortOrder: 'descend' as 'descend',
			sorter: (a: any, b: any): number => {
				if (a.date_of_birth && b.date_of_birth) {
					if (new Date(a.date_of_birth).getDay() < new Date(b.date_of_birth).getDay()) {
						return -1;
					}
					if (new Date(a.date_of_birth).getDay() > new Date(b.date_of_birth).getDay()) {
						return 1;
					}
					return 0;
					// return new Date(a.date_of_birth).getDay() - new Date(a.date_of_birth).getDay()
				}
				return 0;
			}
		},
		{
			title: t('email'),
			dataIndex: 'email',
			key: 'email',
			editable: true,
			width: '12.5%'
		},
		{
			title: t('industry'),
			dataIndex: 'industry',
			key: 'industry',
			filterMultiple: true,
			width: '12.5%',
			editable: true,
			filters: industries.industries.map((el: string) => ({ text: el, value: el })),
			onFilter: (value: any, record: any): boolean => (record.industry ? record.industry.includes(value) : 0),
			defaultSortOrder: 'descend' as 'descend',
			sorter: (a: any, b: any): number => {
				if (a.industry && b.industry) {
					return a.industry.length - b.industry.length;
				}
				return 0;
			}
		},
		{
			title: t('Experience'),
			dataIndex: 'years_of_experience',
			key: 'experience',
			width: '12.5%',
			editable: true,
			filters: [
				{ text: ' 0 - 1 year', value: '0' },
				{ text: '1 - 5 years', value: '1' },
				{ text: '5+ years', value: '2' }
			],
			onFilter: (value: any, record: any): boolean => {
				switch (value) {
					case '0':
						return record.years_of_experience ? record.years_of_experience < 1 : false;
					case '1':
						return record.years_of_experience ? record.years_of_experience < 5 : false;
					case '2':
						return record.years_of_experience ? record.years_of_experience > 5 : false;
					default:
						return false;
				}
			},
			defaultSortOrder: 'descend' as 'descend',
			sorter: (a: any, b: any): number => {
				if (a.years_of_experience && b.years_of_experience) {
					return a.years_of_experience - b.years_of_experience;
				}
				return 0;
			}
		},
		{
			title: t('salary'),
			dataIndex: 'salary',
			key: 'salary',
			width: '12.5%',
			editable: true,
			filters: [
				{ text: ' 0 - 24,999 GBP', value: '0' },
				{ text: '25,000 - 100,000 GBP', value: '1' },
				{ text: '100,000+ GBP', value: '2' }
			],
			onFilter: (value: any, record: any): boolean => {
				switch (value) {
					case '0':
						return record.salary ? record.salary < 25000 : false;
					case '1':
						return record.salary ? record.salary < 100000 : false;
					case '2':
						return record.salary ? record.salary > 100000 : false;
					default:
						return false;
				}
			},
			defaultSortOrder: 'descend' as 'descend',
			sorter: (a: any, b: any): number => {
				if (a.salary && b.salary) {
					return a.salary - b.salary;
				}
				return 0;
			}
		}
	];


	const onSelect = (value: any) => {
		setSelectedUser(value);
	};
	const onChange = (val: any) => (val ? null : setSelectedUser(undefined));
	const handleInputChange = (e: number | undefined): void => {
		if (typeof e === 'number') setPageSize(e);
	};
	const getDataSource = (): metaData.IUserMetaData[] =>
		selectedUser ? users.users.filter((el: metaData.IUserMetaData) => el.id === selectedUser) : users.users;
	return (
		<div style={{ margin: '10px' }}>
			<h1>{t('tableView')}</h1>
			<div style={{ display: 'flex' }}>
				<p> {t('searchUser')}</p>
				<AutoComplete
					dataSource={names.names}
					style={{ width: 200, marginLeft: '5px' }}
					onSelect={onSelect}
					onChange={onChange}
					filterOption={(inputValue, option: any) =>
						option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
				/>
				<p style={{ marginLeft: '30px' }}>{t('entriesPerPage')}</p>{' '}
				<InputNumber min={0} style={{ marginLeft: '5px' }} onChange={handleInputChange} />
			</div>
			<Table
				dataSource={getDataSource()}
				columns={columns}
				rowKey={record => record.id}
				pagination={{ pageSize: PageSize, defaultPageSize: 10, position: 'both' }}
			/>
		</div>
	);
};

export default HomePage;
