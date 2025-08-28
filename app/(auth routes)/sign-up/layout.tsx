interface Props {
    children: React.ReactNode;
}

const SignUpLayout = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default SignUpLayout;