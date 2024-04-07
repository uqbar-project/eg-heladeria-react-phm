import { useState } from 'react'

export const useModal = () => {
  const [isOpened, setIsOpened] = useState(false)

  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)

  return { isOpened, open, close }
}
