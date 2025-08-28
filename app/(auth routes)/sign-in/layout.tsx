interface Props {
    children: React.ReactNode;
}

const SignInLayout = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default SignInLayout;