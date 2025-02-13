import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/UI/button";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
};

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};
  
export default function LoginComponent() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <div className="flex gap-4 items-center justify-end">
            {isLoading ? "Loading..." : isAuthenticated ? `User: ${user?.name}` : null}
            {isLoading ? null : isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    );
}