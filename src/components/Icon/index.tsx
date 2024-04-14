import Icecream from '@/assets/icons/icecream-logo-filled.svg?react'
import Search from '@/assets/icons/search.svg?react'
import Edit from '@/assets/icons/edit-icon.svg?react'
import ArrowBack from '@/assets/icons/arrow-back.svg?react'
import Trash from '@/assets/icons/trash.svg?react'
import PlusCircle from '@/assets/icons/plus-circle.svg?react'
import Close from '@/assets/icons/close.svg?react'
import ErrorOutlineThin from '@/assets/icons/error-outlined-thin.svg?react'
import CheckOutlineThin from '@/assets/icons/check-circle-thin.svg?react'
import WarningOutlineThin from '@/assets/icons/warning-outlined-thin.svg?react'
import InfoCircle from '@/assets/icons/info-circle.svg?react'

import { twMerge } from 'tailwind-merge'

const iconsMap = {
  Icecream,
  Search,
  Edit,
  ArrowBack,
  Trash,
  PlusCircle,
  Close,
  ErrorOutlineThin,
  CheckOutlineThin,
  WarningOutlineThin,
  InfoCircle,
} as const

export type IconsMap = typeof iconsMap
export type IconsNames = keyof IconsMap
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconsNames
  clickable?: boolean
  onClick?: () => void
  className?: string
  svgProps?: React.SVGProps<SVGSVGElement>
}
const Icon = ({ name, onClick, className, svgProps }: IconProps) => {
  const IconToRender = iconsMap[name]

  if (!IconToRender) return null
  return (
    <IconToRender
      {...svgProps}
      className={twMerge(
        `${!!onClick && 'cursor-pointer hover:fill-primary-light'} transition-all h-5 fill-primary-default`,
        className
      )}
      onClick={onClick}
    />
  )
}
export default Icon
