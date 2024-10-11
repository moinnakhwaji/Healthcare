import Image from 'next/image'
import PatientForm from '@/components/forms/patientForm'
import Link from 'next/link'
import PasskeyModal from '@/components/PasskeyModal'
// import React from 'react'


const Home = ({searchParams}:SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true"


  return (
    <div className='flex h-screen min-h-screen'>

      {/* otp verification baki hai */}
      {isAdmin && <PasskeyModal/> }
      <section className='my-auto container remove-scrollbar'>
 
        <div className=' sub-container  max-w-[496px]'>
          <Image className='mb-12 h-10 w-full' src="/assets/icons/logo-full.svg" alt='logo' width={1000} height={1000}/>
    <PatientForm/>
    <div className='text-14-regular mt-20 flex justify-between'>
      <p className='justify-items-end text-dark-600 xl:text-left'>© 2024 Care Heaven</p>
      <Link href="/?admin=true" className='text-green-500'>Admin</Link>
      
        </div>
        </div>
      </section>
      <Image className='cover side-img max-w-[50%] ' src={"/assets/images/onboarding-img.png"} height={1000} width={1000} alt='sideimage'></Image>

    </div>
  )
}

export default Home