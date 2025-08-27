import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
    <h1 className="w-full mx-auto mt-12 text-center font-semibold text-5xl">SkillAmi</h1>
    <Card className="w-full max-w-sm m-auto mt-12">
      <CardHeader>
        <Button type="submit" className="w-full mb-4" onClick={() => loginWithRedirect()}>
          Sign up
        </Button>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full" onClick={() => loginWithRedirect()}>
          Login with Google
        </Button>
      </CardFooter>
    </Card></>
  )
}

export default Login
