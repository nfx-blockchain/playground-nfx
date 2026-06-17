import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  className = '',
  ...props 
}) => {
  return (
    <button className={`icon-button ${className}`} {...props}>
      <span>{icon}</span>
    </button>
  );
};