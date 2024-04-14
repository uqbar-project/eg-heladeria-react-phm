type Props = { errors: string | string[] }

const RenderErrorList = ({ errors }: Props) => {
  const errorMessages = Array.isArray(errors) ? errors : [errors]

  return (
    <div className='flex flex-col gap-2 bg-gray-200 p-4 border-r-8'>
      <ul className='px-6 m-0'>
        {errorMessages.map((err) => {
          return (
            <li key={err} className='text-[12px]'>
              {err}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RenderErrorList
