import React, { useState, ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useTranslation } from 'react-i18next';
import { Table, InputNumber, Input, AutoComplete } from 'antd';
import 'antd/es/button/style/css';
import i18n from '../i18n';
import data1 from './data.json';
import TableContainer from '../containers/TableContainer';

export const USERS_QUERY = gql`
	query Users($lang: LanguageType!) {
		users(lang: $lang) {
			id
			first_name
			last_name
			email
			industry
			years_of_experience
			salary
			date_of_birth
		}
	}
`;
let industries: string[] = [];
for (let i = 0; i < data1.length; ++i) {
	const industry = data1[i].industry as string;
	if (industries.indexOf(industry) === -1) industries.push(industry);
}
const newArr = industries.map((el) => ({ text: el, value: el }));

const HomePage = () => {
	const columns = [
		{
			title: 'First Name',
			dataIndex: 'first_name',
			key: 'first_name',
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
			width: '12.5%',
			editable: true
		},
		{
			title: 'Last Name',
			dataIndex: 'last_name',
			key: 'last_name',
			width: '12.5%',
			editable: true,
			onFilter: (value: any, record: any) => record.name.indexOf(value) === 0
		},
		{
			title: 'DOB',
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
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			editable: true,
			width: '12.5%'
		},
		{
			title: 'Industry',
			dataIndex: 'industry',
			key: 'industry',
			filterMultiple: true,
			width: '12.5%',
			editable: true,
			filters: newArr.slice(0, 15),
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
			title: 'Experience (yrs)',
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
			title: 'Salary (£)',
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

	const { t } = useTranslation([ 'common', 'api' ]);
	const [ collapsed, setCollapsed ] = useState(false);
	const [ PageSize, setPageSize ] = useState(10);
	const { loading, error, data } = useQuery(USERS_QUERY, {
		variables: { lang: i18n.language.toUpperCase() }
	});
	let users = [];
	const onSelect = (value: any) => {
		console.log('value@: ', value)
	};
	const onSearch = (val: any) => console.log('va;', val)
	const onChange = (val: any) => console.log('va;l', val)
	const handleInputChange = (e: number | undefined): void => {
		if (typeof e === 'number') setPageSize(e);
	};

	const getInput = (inputType: string): ReactElement => {
		if (inputType === 'number') {
			return <InputNumber />;
		}
		return <Input />;
	};
	if (data && data.users) {
		users = data.users;
	}
	if (loading) return <p>{t('api:LOADING_MESSAGE')}</p>;
	if (error) return <p>{t('api:ERROR_MESSAGE')}</p>;
	console.log('meh: ', columns[4]);
	return (
		<div style={{ margin: '10px' }}>
			<h1>Table view OLD</h1>
			<div style={{ display: 'flex' }}>
				<p>Enter entries per page:</p>{' '}
				<InputNumber min={0} style={{ marginLeft: '5px' }} onChange={handleInputChange} />
				<p style={{ marginLeft: '30px' }}> Search User: </p>
				<AutoComplete
					dataSource={['john']}
					style={{ width: 200 }}
					onSelect={onSelect}
					onChange={onChange}
					placeholder="input here"
					filterOption={(inputValue, option: any) =>
						option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					  }
				/>
			</div>
			<Table dataSource={users} columns={columns} pagination={{ pageSize: PageSize, defaultPageSize: 10 }} />
			{/* <EditableFormTable /> */}
			<TableContainer />
		</div>
	);
};

export default HomePage;
