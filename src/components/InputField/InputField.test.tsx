import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Input" />);
    expect(screen.getByLabelText(/Test Input/)).toBeInTheDocument();
  });

  test('handles input change', () => {
    const handleChange = jest.fn();
    render(<InputField label="Test Input" onChange={handleChange} />);
    
    const input = screen.getByLabelText(/Test Input/);
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('shows error message when invalid', () => {
    render(<InputField label="Test Input" invalid errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('displays clear button when clearable and has value', () => {
    render(<InputField label="Test Input" clearable value="test value" />);
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });
});