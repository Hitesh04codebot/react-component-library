import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

interface TestData {
  id: number;
  name: string;
}

describe('DataTable', () => {
  const testData: TestData[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];

  // Fix: Properly type the columns with TestData generic
  const columns = [
    { key: 'id', title: 'ID', dataIndex: 'id' as keyof TestData, sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestData, sortable: true },
  ];

  test('renders table with data', () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('handles row selection when selectable', () => {
    const handleSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={columns} 
        selectable 
        onRowSelect={handleSelect} 
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Select first row
    
    expect(handleSelect).toHaveBeenCalled();
  });
});