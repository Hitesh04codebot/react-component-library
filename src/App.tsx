import React, { useState } from 'react';
import InputField from './components/InputField/InputField';
import DataTable, { Column } from './components/DataTable/DataTable';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  ];

  const columns: Column<User>[] = [
    { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <div className="mb-6">
        <InputField
          label="Search users"
          placeholder="Search by name or email..."
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
          <ul>
            {selectedUsers.map(user => (
              <li key={user.id} className="mb-1">{user.name} ({user.email})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;