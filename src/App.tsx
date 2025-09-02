import React, { useState, useMemo } from 'react';
import InputField from './components/InputField/InputField';
import DataTable, { Column } from './components/DataTable/DataTable';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

function App() {
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'Manager', status: 'Active' },
    { id: 7, name: 'Ethan Davis', email: 'ethan@example.com', role: 'Developer', status: 'Active' },
    { id: 8, name: 'Fiona Clark', email: 'fiona@example.com', role: 'Designer', status: 'Active' },
    { id: 9, name: 'George White', email: 'george@example.com', role: 'User', status: 'Inactive' },
    { id: 10, name: 'Hannah Taylor', email: 'hannah@example.com', role: 'Analyst', status: 'Active' },
    { id: 11, name: 'Ian Anderson', email: 'ian@example.com', role: 'User', status: 'Active' },
    { id: 12, name: 'Jessica Thomas', email: 'jessica@example.com', role: 'Editor', status: 'Active' },
    { id: 13, name: 'Kevin Martin', email: 'kevin@example.com', role: 'User', status: 'Pending' },
    { id: 14, name: 'Laura Garcia', email: 'laura@example.com', role: 'Manager', status: 'Active' },
    { id: 15, name: 'Mike Lee', email: 'mike@example.com', role: 'Developer', status: 'Active' },
    { id: 16, name: 'Nina King', email: 'nina@example.com', role: 'User', status: 'Inactive' },
    { id: 17, name: 'Oliver Wright', email: 'oliver@example.com', role: 'Designer', status: 'Active' },
    { id: 18, name: 'Paula Scott', email: 'paula@example.com', role: 'Analyst', status: 'Active' },
    { id: 19, name: 'Quinn Adams', email: 'quinn@example.com', role: 'User', status: 'Active' },
    { id: 20, name: 'Rachel Green', email: 'rachel@example.com', role: 'Admin', status: 'Active' },
    { id: 21, name: 'Steve Harris', email: 'steve@example.com', role: 'Developer', status: 'Active' },
    { id: 22, name: 'Tina Lopez', email: 'tina@example.com', role: 'User', status: 'Pending' },
    { id: 23, name: 'Uma Patel', email: 'uma@example.com', role: 'Designer', status: 'Active' },
    { id: 24, name: 'Victor Young', email: 'victor@example.com', role: 'Analyst', status: 'Active' }
  ];

  const columns: Column<User>[] = [
    { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
    { 
      key: 'status', 
      title: 'Status', 
      dataIndex: 'status', 
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'Inactive' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    
    return users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <div className="mb-6">
        <InputField
          label="Search users"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          clearable
          className="max-w-md"
        />
      </div>
      
      <DataTable
        data={filteredUsers}
        columns={columns}
        selectable
        onRowSelect={setSelectedUsers}
      />
      
      {selectedUsers.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Selected Users ({selectedUsers.length})</h2>
          <ul className="max-h-60 overflow-y-auto">
            {selectedUsers.map((user, index) => (
              <li key={`${user.id}-${index}`} className="mb-1 py-1 border-b border-gray-200">
                {user.name} ({user.email}) - {user.role}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;