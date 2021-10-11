import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import AuthContext from '../components/AuthContext';

const PrivateRoute = (WrappedComponent) => {
	return (props) => {
		const Router = useRouter();
		const [currentUser] = useContext(AuthContext);

		// checks whether we are on client / browser or server.
		if (typeof window !== undefined && currentUser?.uid !== undefined ) {
			const isAdmin = currentUser?.uid == 'n49a6ko1tKdhuIIs30uft1eeBwO2';
			
			// if (currentUser == null) {
			// 	Router.replace('/Signin');
			// 	return null;
			// }
			if (!isAdmin) {
				Router.replace('/404');
				return null;
			}

			return <WrappedComponent {...props} />;
		}

		return null;
	};
};

export default PrivateRoute;
