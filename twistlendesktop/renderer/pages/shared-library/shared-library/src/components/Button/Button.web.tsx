import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} style={{ padding: 10, backgroundColor: 'blue', color: 'white' }}>
    {label}
  </button>
);

export default Button;
