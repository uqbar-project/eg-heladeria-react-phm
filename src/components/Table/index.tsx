// table reusable component
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon, { IconsNames } from '../Icon'
import './styles.css'

type Row = {
  id: string | number
}

export type Column<T extends Row> = {
  key: string
  field?: keyof T
  headerName: string
  className?: string
  valueGetter?: (row: T) => string | number
  render?: (row: T) => ReactNode
}

type EmptyState = {
  icon?: IconsNames
  title?: string
  description?: string
}

const defaultEmptyState: EmptyState = {
  icon: 'Search',
  title: 'No se encontraron resultados',
  description: 'Intentá con otros criterios de búsqueda',
}

type Props<T extends Row> = {
  data: T[]
  columns: Column<T>[]
  className?: string
  emptyState?: EmptyState
}

const Table = <T extends Row>({ data, columns, className, emptyState }: Props<T>) => {
  const { icon, title, description } = { ...defaultEmptyState, ...emptyState }
  return (
    <section
      className={twMerge(
        'table-container w-full border-gray-200 border border-spacing-x-4 border-spacing-y-4',
        className
      )}
    >
      <table className='w-full'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.headerName} className={twMerge('text-start', column.className)}>
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <div className='flex flex-col items-center justify-center py-8 text-primary-500'>
                  {icon && (
                    <div className='mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-cream-100'>
                      <Icon name={icon} className='h-7 w-7 fill-accent-300' />
                    </div>
                  )}
                  <p className='text-base font-semibold'>{title}</p>
                  {description && <p className='text-sm text-primary-400'>{description}</p>}
                </div>
              </td>
            </tr>
          )}
          {data.map((datum) => (
            <tr key={datum.id}>
              {columns.map((column) => {
                const { key, field, className, render } = column
                const value = column.valueGetter ? column.valueGetter(datum) : field ? datum[field] : ''

                return (
                  <td key={`${datum.id}_${key} `} className={twMerge('p-3', className)}>
                    {render ? render(datum) : <>{value}</>}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Table
