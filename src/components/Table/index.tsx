// table reusable component
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
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

type Props<T extends Row> = {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
}

const Table = <T extends Row>({ data, columns, loading = false }: Props<T>) => {
  return (
    <section className='table-container w-full border-gray-200 border border-spacing-x-4 border-spacing-y-4'>
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
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan={columns.length} className='p-3 text-center'>
                No hay datos
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
