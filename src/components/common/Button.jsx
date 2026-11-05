export function Button({
  children,
  variant = "primary", // primary, outline, secondary, danger
  size = "md", // sm, md, lg, xs
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const variantClass = `button-${variant}`;
  const sizeClass = size !== "md" ? `button-${size}` : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
