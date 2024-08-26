import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const page = () => {
  return (
  <div className="flex items-center justify-center min-h-screen">
     <SignUp appearance={{baseTheme:dark}}/>
  </div>
  )
}

export default page