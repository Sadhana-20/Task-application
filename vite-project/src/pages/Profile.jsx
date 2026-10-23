import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Profile = ({ user, onLogout, onUpdateUser }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1>My Profile</h1>
          <p>Please log in to view your profile.</p>
          <Link to="/login" className="profile-button">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in all fields.');
      return;
    }

    const updatedUser = {
      ...user,
      name: name.trim(),
      email: email.trim()
    };

    onUpdateUser(updatedUser);
    setEditing(false);
    setMessage('Profile updated successfully!');
  };

  const handleCancel = () => {
    setName(user.name || '');
    setEmail(user.email || '');
    setEditing(false);
    setMessage('');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <p className="profile-subtitle">
          View and update your account details.
        </p>

        {editing ? (
          <form onSubmit={handleSave}>
            <label htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="profile-actions">
              <button type="submit" className="profile-button">
                Save Changes
              </button>

              <button
                type="button"
                className="profile-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-detail">
              <strong>Name</strong>
              <p>{user.name}</p>
            </div>

            <div className="profile-detail">
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>

            <button
              className="profile-button"
              onClick={() => {
                setMessage('');
                setEditing(true);
              }}
            >
              Edit Profile
            </button>
          </>
        )}

        {message && (
          <p className="profile-message">{message}</p>
        )}

        <button className="profile-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
