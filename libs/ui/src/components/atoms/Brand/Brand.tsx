import { Role } from '@parkora-org/types'
import { BrandIcon } from '../BrandIcon'

export interface IBrandProps {
  shortForm?: boolean
  className?: string
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className,
  type = undefined,
}: IBrandProps) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="text-xl ">
        {shortForm ? (
          <div className="flex gap-1">
            <BrandIcon /> P.
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <div>Parkora</div>
                <span className="text-xs">{type}</span>
              </div>
              <div className="text-xs text-gray">Krishna</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
