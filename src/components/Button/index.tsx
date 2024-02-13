import './button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: Props) => {
  const { className, ...rest } = props
  return (
    <button className={`${className}`} {...rest}>
      Test
    </button>
  )
}

export default Button
