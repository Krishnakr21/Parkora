import { ReactNode } from 'react'

export interface IBrandIconProps {
  children?: ReactNode
}

export const BrandIcon = ({
  children = (
    <div className="bg-yellow-400 shadow-md w-2 h-4 rounded-xs animate-park-car" />
  ),
}: IBrandIconProps) => {
  return (
    <div className="inline-block overflow-hidden select-none">
      <div className="flex items-center justify-center border-2 border-yellow-400 w-5 h-7 rounded-md bg-black/10 shadow-[0_0_8px_rgba(250,204,21,0.4)] transition-all hover:scale-105">
        {children}
      </div>
    </div>
  )
}
