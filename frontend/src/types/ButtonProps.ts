import React from 'react';

export type Variant = 'primary' | 'danger' | 'warning' | 'light';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    children: React.ReactNode;
}