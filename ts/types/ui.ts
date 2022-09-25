import React from 'react';

export type Ui = {
  children?: React.ReactNode;
  className: string;
};

export type Label = {
  children:React.ReactNode,
  className?:string
  htmlFor:string
}

export type TextArea = {
  className?:string
  name:string
  id:string
  placeholder:string
}

export type CheckBox = {
  className:string
  name:string
  id:string
}

export type OptionsContainer = {
  children:React.ReactNode,
  className?:string
}