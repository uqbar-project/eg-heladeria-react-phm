import Icecream from '@/assets/icons/icecream-logo-filled.svg?react'
import Search from '@/assets/icons/search.svg?react'
import Edit from '@/assets/icons/edit-icon.svg?react'
import ArrowBack from '@/assets/icons/arrow-back.svg?react'
import Trash from '@/assets/icons/trash.svg?react'
import { twMerge } from 'tailwind-merge'

const iconsMap = {
  Icecream,
  Search,
  Edit,
  ArrowBack,
  Trash,
} as const

export type IconsMap = typeof iconsMap
export type IconsNames = keyof IconsMap
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconsNames
  clickable?: boolean
  onClick?: () => void
  className?: string
  svgProp?: React.SVGProps<SVGSVGElement>
}
const Icon = ({ name, onClick, className, svgProp }: IconProps) => {
  const IconToRender = iconsMap[name]

  if (!IconToRender) return null
  return (
    <IconToRender
      {...svgProp}
      className={twMerge(`${!!onClick && 'cursor-pointer'} transition-all h-4`, className)}
      onClick={onClick}
    />
  )
}
export default Icon
