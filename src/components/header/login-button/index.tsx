import { useClerk } from "@clerk/clerk-react";

export default function LoginButton() {
  const { openSignUp } = useClerk();
  return <button onClick={()=>openSignUp()}>Sign In</button>;
};