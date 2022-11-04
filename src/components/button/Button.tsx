import './button.css'

type childreProps = {
    children: React.ReactNode
    onClick: (e:  React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean
}

const Button = ({children, onClick, disabled}: childreProps) => {
  return (
    <button onClick={onClick} className="btn gradient__background" disabled={disabled}>{children}</button>
  )
}

export default Button