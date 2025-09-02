import React from 'react';
import { Meta, StoryFn } from '@storybook/react'; // Keep this import
import InputField, { InputFieldProps } from './InputField';

// Add this line to disable the eslint rule for this file
// eslint-disable-next-line storybook/no-renderer-packages

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

// Rest of your stories remain the same