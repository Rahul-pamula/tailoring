export function Button({ children, className = '', variant = 'primary', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-[1.05] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none transform'
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-accent shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/35 px-6 py-3.5',
    secondary: 'bg-brand-pink text-accent hover:bg-brand-pink-dark shadow-sm px-6 py-3.5',
    outline: 'border-2 border-primary text-primary hover:bg-brand-pink shadow-sm px-6 py-3.5',
    ghost: 'hover:bg-brand-pink hover:text-primary px-4 py-2',
    icon: 'p-2.5 rounded-full hover:bg-brand-pink text-foreground',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20ba59] shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 px-6 py-3.5'
  }
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
