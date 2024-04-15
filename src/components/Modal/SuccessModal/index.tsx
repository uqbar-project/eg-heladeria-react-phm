import Button from '@/components/Button'
import { ReactNode } from 'react'
import Modal from '..'
import ModalResponseContent from '../components/ModalResponseContent'

type Props = {
  isOpened: boolean
  onClose?: () => void
  title?: ReactNode
  content?: ReactNode
}

const SuccessModal = ({ isOpened = false, title, content, onClose }: Props) => {
  return (
    <Modal className='h-fit p-6' isOpened={isOpened} close={onClose}>
      <ModalResponseContent
        title={title}
        type='success'
        content={content ? <p className='text-[12px] text-center'>{content}</p> : null}
        actions={[<Button className='button-outlined' label='Cerrar' key='close' type='button' onClick={onClose} />]}
      />
    </Modal>
  )
}

export default SuccessModal
