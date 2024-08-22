

const Button = ({ onClick, children, type = 'button', className = '' }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
