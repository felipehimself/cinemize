import React from 'react';

export type Ui = {
  children?: React.ReactNode;
  className: string;
};

export type Button = {
  children?: React.ReactNode;
  className: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?:boolean
};

export type Input = {
  children?: React.ReactNode;
  className: string;
  name: string;
  value: string;
  id: string;
  placeHolder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Label = {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
};

export type TextArea = {
  className?: string;
  name: string;
  id: string;
  placeholder: string;
};



export type OptionsContainer = {
  children: React.ReactNode;
  className?: string;
};

export type Form = {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type Logout = {
  className: string;
  size: number;
};

export type Fieldset = {
  children: React.ReactNode;
  disabled: boolean;
  className: string;
};

export type TabContent = {
  activeTab: string;
  tab: string;
  children: React.ReactNode;
};
