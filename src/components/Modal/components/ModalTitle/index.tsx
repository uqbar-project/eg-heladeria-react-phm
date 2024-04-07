import Icon from '@/components/Icon'

type Props = {
  title: string
  close?: () => void
}

const ModalTitle = ({ title, close }: Props) => {
  return (
    <div className='flex justify-between items-center gap-2'>
      <h1 className='text-black font-bold text-[16px]'>{title}</h1>
      {close && <Icon name='Close' className='h-[24px]' onClick={close} />}
    </div>
  )
}

export default ModalTitle
