import Link from 'next/link';
import PropTypes from 'prop-types';
import { logout, withAuth } from '../utils/withAuth';

const Profile = ({ user }) => (
  <div>
    {user ? (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <button onClick={logout}>Logout</button>
        <div>{JSON.stringify(user)}</div>
      </div>
    ) : (
      <div>
        <div>You're logged out</div>
        <Link href="/login">
          <a>Log In</a>
        </Link>
      </div>
    )}
  </div>
);

Profile.propTypes = {
	user: PropTypes.object, // eslint-disable-line
};

export default withAuth(Profile);
