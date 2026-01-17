import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation Bar */}
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-xl">
            LeetCode
          </NavLink>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost">
              {user?.firstName}
            </div>
            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              {user?.role === 'admin' && (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
          <div className="card-body">
            <h2 className="card-title text-2xl justify-center mb-4">
              User Profile
            </h2>

            <div className="space-y-3">
              <div>
                <span className="font-semibold">First Name:</span>{' '}
                {user?.firstName}
              </div>

              <div>
                <span className="font-semibold">Email:</span>{' '}
                {user?.email}
              </div>

              <div>
                <span className="font-semibold">Role:</span>{' '}
                <span className="badge badge-outline">
                  {user?.role}
                </span>
              </div>
            </div>

            <div className="card-actions justify-center mt-6">
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
