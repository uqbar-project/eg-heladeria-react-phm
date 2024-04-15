import Icon, { IconsMap } from '@/components/Icon'
import { ReactNode, isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'

type ModalResponseType = 'success' | 'error' | 'warning'

type Props = {
  title?: string | ReactNode
  onCloseClickOutside?: () => void
  type?: ModalResponseType
  content?: string | ReactNode
  actions?: ReactNode[]
}

const modalResponseContentIconMap: { [key in ModalResponseType]: { icon: keyof IconsMap; className: string } } = {
  success: { icon: 'CheckOutlineThin', className: 'fill-success-default' },
  error: { icon: 'ErrorOutlineThin', className: 'fill-error-default' },
  warning: { icon: 'WarningOutlineThin', className: 'fill-error-default' },
} as const

const ModalResponseContent = ({ title, type = 'error', content, actions, onCloseClickOutside }: Props) => {
  const { icon, className } = modalResponseContentIconMap[type || 'error']

  return (
    <div className='w-full flex flex-col min-h-full'>
      {onCloseClickOutside && (
        <Icon name='Close' className='h-fit w-fit absolute top-[10px] right-[10px]' onClick={onCloseClickOutside} />
      )}
      <div className='flex flex-col gap-4 w-full'>
        {type && (
          <div className='flex flex-col items-center w-full'>
            <Icon name={icon} className={twMerge('h-[42px] w-[42px]', className)} />
          </div>
        )}
        {title && isValidElement(title) ? (
          title
        ) : (
          <label className='text-[14px] font-semibold text-center'>{title}</label>
        )}
        {content && isValidElement(content) ? content : <label className='text-[12px] text-center'>{content}</label>}
        {actions && <div className='flex justify-center gap-8 mt-4'>{actions.map((action) => action)}</div>}
      </div>
    </div>
  )
}

export default ModalResponseContent
