import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../components/AuthContext';

const PrivateRoute = (WrappedComponent) => {
	return (props) => {
		// checks whether we are on client / browser or server.
		const Router = useRouter();
		const user = useContext(AuthContext);

		const isAdmin = user.uid == process.env.NEXT_PUBLIC_SUPER_ADMIN;

		if (typeof window !== 'undefined') {
			// If there is no access token we redirect to "/" page.
			if (!user) {
				Router.replace('/LoginForm');
				return null;
			}
			if (!isAdmin) {
				Router.replace('/404');
				return null;
			}

			// If this is an accessToken we just render the component that was passed with all its props

			return isAdmin && <WrappedComponent {...props} />;
		}

		// If we are on server, return null
		return null;
	};
};

export default PrivateRoute;
