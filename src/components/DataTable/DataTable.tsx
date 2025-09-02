import React, { useState, useMemo } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
}

const DataTable = <T,>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  // Handle row selection
  const toggleRowSelection = (row: T) => {
    const isSelected = selectedRows.includes(row);
    let newSelectedRows: T[];

    if (isSelected) {
      newSelectedRows = selectedRows.filter((r) => r !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }

    setSelectedRows(newSelectedRows);
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      if (onRowSelect) {
        onRowSelect([]);
      }
    } else {
      setSelectedRows([...data]);
      if (onRowSelect) {
        onRowSelect([...data]);
      }
    }
  };

  // Handle sorting
  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Render cell content - Fixed to always return a ReactNode
  const renderCellContent = (column: Column<T>, record: T, index: number): React.ReactNode => {
    if (column.render) {
      return column.render(record[column.dataIndex], record, index);
    }

    const value = record[column.dataIndex];
    
    // Handle different value types to ensure we return a ReactNode
    if (value === null || value === undefined) {
      return null;
    }
    
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }
    
    if (React.isValidElement(value)) {
      return value;
    }
    
    // For objects, arrays, and other types, convert to string
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`flex flex-col justify-center items-center p-8 text-gray-500 ${className}`}>
        <AlertCircle className="h-12 w-12 mb-2" />
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                <div className="flex items-center">
                  {column.title}
                  {sortConfig && sortConfig.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={selectedRows.includes(item) ? 'bg-blue-50' : ''}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item)}
                    onChange={() => toggleRowSelection(item)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {renderCellContent(column, item, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;