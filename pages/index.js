import Link from 'next/link';
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

export default withAuth(Index);
