import gql from 'graphql-tag';

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
