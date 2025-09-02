import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react'; // Keep this import
import DataTable, { DataTableProps, Column } from './DataTable';

// Add this line to disable the eslint rule for this file
// eslint-disable-next-line storybook/no-renderer-packages

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default {
  title: 'Components/DataTable',
  component: DataTable,
} as Meta;

