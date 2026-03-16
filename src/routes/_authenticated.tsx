import { onBeforeLoad } from '@/utils/routes'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import TokenDebugPanel from '@/components/TokenDebugPanel'

const AuthenticatedLayout = () => {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TokenDebugPanel />}
    </>
  )
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: onBeforeLoad,
  component: AuthenticatedLayout,
})
