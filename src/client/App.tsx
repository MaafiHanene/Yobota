import React, { useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { I18nextProvider } from 'react-i18next';
import ReactGA from 'react-ga';
import TableContainer from './containers/TableContainer';
import i18n from './i18n';
import changeLang from './providers/changeLang';
import appRoutes from './providers/appRoutes';
import ChartView from './pages/ChartView';
// import { AuthProvider } from './providers/Auth';
// import { login } from './providers/auth-client';

// Initialize google analytics page view tracking
const trackingCode = process.env.GA_TRACKING_NUMBER ? process.env.GA_TRACKING_NUMBER : '';
ReactGA.initialize(trackingCode, {
	titleCase: false,
	gaOptions: {
		name: 'WAtracker',
		siteSpeedSampleRate: 100 // send everything
	}
});
// Initial page will not be recorded yet hence..
ReactGA.pageview('/', [ 'WAtracker' ]);

const PrivateRoute = ({ render: Component, ...rest }: any) => (
	<Route
		render={(props) =>
			window.localStorage.getItem('id_token') ? <Component {...props} /> : <Redirect to="/login" />}
		{...rest}
	/>
);

const App = ({ store, client, history }: any) => {
	useEffect(
		() =>
			history.listen((location: any) => {
				const url = location.pathname + location.search;
				if (url.includes('lang=')) {
					changeLang(url);
				}
				ReactGA.set({ page: location.pathname }, [ 'WAtracker' ]);
				ReactGA.pageview(url, [ 'WAtracker' ]);
			}),
		[]
	);

	const url = history.location.pathname + history.location.search;
	if (url.includes('lang=')) {
		changeLang(url);
	}
	// const handleClick = async (urlWithCode) => {
	//   const authCode = urlWithCode.search.split('=').pop();
	//   await login(authCode);
	// };

	return (
		<Provider store={store}>
			{/* <AuthProvider> */}
			<I18nextProvider i18n={i18n}>
				<ApolloProvider client={client}>
					<Switch>
						{/* <PrivateRoute exact path={appRoutes.rootPath(i18n.language)} render={() => <TableContainer />} /> */}
						<Route path={appRoutes.tableView()} render={() => <TableContainer />} />
						<Route path={appRoutes.chartView()} render={() => <ChartView />} />
						{/* <Route
							path="/view-user/:userId"
							render={(props) => (
								<UserContainer userID={props.history.location.pathname.split('/').pop()} />
							)}
						/> */}

						<Redirect from="" to={appRoutes.tableView()} />
					</Switch>
				</ApolloProvider>
			</I18nextProvider>
			{/* </AuthProvider> */}
		</Provider>
	);
};

export default withRouter(App);
