import Link from 'next/link';
import PropTypes from 'prop-types';
import { logout, withAuth } from '../utils/withAuth';

const Index = ({ user }) => (
  <div>
    {user ? (
      <div>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <div>You're logged in as {user.displayName} </div>
        <button onClick={logout}>Logout</button> 
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

Index.propTypes = {
	user: PropTypes.object, // eslint-disable-line
};

export default withAuth(Index);
