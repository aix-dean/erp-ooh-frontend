import React from 'react';
import usersData from '@/data/users.json'; // Mock data

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  status: string;
}

interface UserDetailProps {
  userId: string;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const user = (usersData as User[]).find(u => u.id === userId);

  if (!user) {
    return <p className="text-red-500">User not found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User: {user.username}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{user.status}</span></p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Permissions</h3>
          {user.permissions && user.permissions.length > 0 ? (
            <ul>
              {user.permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          ) : (
            <p>No specific permissions assigned.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Edit User
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Deactivate User
        </button>
      </div>
    </div>
  );
};

export default UserDetail;