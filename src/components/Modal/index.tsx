import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  isOpened: boolean
  close?: () => void
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDialogElement>

const Modal = ({ isOpened, close, children, ...props }: Props) => {
  const { className } = props
  const ref = useRef<HTMLDialogElement>(null)

  const onCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    if (!close) {
      e.preventDefault()
    }
    close?.()
  }

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [isOpened, close])

  return (
    <dialog
      ref={ref}
      onCancel={onCancel}
      {...props}
      className={twMerge(
        'm-auto w-auto h-auto max-w-[600px] rounded-2xl outline-none backdrop:bg-gray-900/60 backdrop:backdrop-blur-sm open:animate-fade-in open:backdrop:animate-fade-in',
        className
      )}
    >
      {children}
    </dialog>
  )
}

export default Modal
