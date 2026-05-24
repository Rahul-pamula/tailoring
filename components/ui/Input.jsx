import { forwardRef } from 'react'

export const Input = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow ${className}`}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export const Textarea = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow ${className}`}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'
