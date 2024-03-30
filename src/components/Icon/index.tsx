import Icecream from '@/assets/icons/icecream-logo-filled.svg?react'
import Search from '@/assets/icons/search.svg?react'
import Edit from '@/assets/icons/edit-icon.svg?react'
import { twMerge } from 'tailwind-merge'

const iconsMap = {
  Icecream,
  Search,
  Edit,
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
const Icon = ({ name, onClick, className = 'h-4', svgProp }: IconProps) => {
  const IconToRender = iconsMap[name]

  if (!IconToRender) return null
  return (
    <IconToRender
      {...svgProp}
      className={twMerge(`${!!onClick && 'cursor-pointer'} transition-all`, className)}
      onClick={onClick}
    />
  )
}
export default Icon
