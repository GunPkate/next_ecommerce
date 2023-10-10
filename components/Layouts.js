import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import { Nav } from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className={'bg-blue-500 w-screen h-screen flex items-center'}>
        <div className="text-center w-full">
          <button onClick={()=> signIn('google')} className='bg-white p-2 px-4 rounded-md'>Login with Google</button>
        </div>
      </div>
    )
  }
  return (
    <div className={'bg-blue-500 w-screen h-screen flex'}>
        <Nav/>
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 p-4 rounded-lg">
          {/* {children} */}
          <div className='text-blue-900 flex justify-between'>
            <h2>
                Hello, <b> {session?.user?.name} </b>
            </h2>
            <div className='flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden'>
                <img src={session?.user?.image} className='w-8 h-8' /> 
                <span className='px-2'>
                    {session?.user?.name}
                </span>
            </div>

          </div>
        </div>
    </div>
  )
}
