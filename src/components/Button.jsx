function Button({
  children,
  type = 'button',
  bgColor = 'bg-gradient-to-r from-[#00C2B8] via-[#5A86D9] to-[#9A63E0]',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${className} px-4 py-2 rounded-lg`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;