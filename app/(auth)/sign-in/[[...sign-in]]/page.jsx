import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (

<section className="bg-white">
  <div className="min-h-screen flex items-center justify-center px-8 py-8 ">
    <main
      className=""
    >
        <SignIn/>
    </main>
  </div>
</section>
  )
}