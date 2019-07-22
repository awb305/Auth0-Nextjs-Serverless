import { logout, withAuth } from '../utils/withAuth';
import Link from 'next/link';

const Profile = ({ user }) => {
  return (
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
};

export default withAuth(Profile);
