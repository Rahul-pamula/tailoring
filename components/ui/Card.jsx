export function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-card rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-gray-100/50 overflow-hidden transition-all duration-200 hover:shadow-[0_16px_36px_rgba(232,140,154,0.1)] hover:-translate-y-[6px] active:scale-[0.99] cursor-pointer animate-card-float ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}
