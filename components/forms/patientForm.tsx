"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormfeild, { FormFieldType } from "../CustomFormfeild"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { formSchema } from "@/lib/Validation"
import { createUser } from "@/lib/actions/patient.action"


// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const PatientForm = () => {
  const [isloading,setisloading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async ({name,email,phone}: z.infer<typeof formSchema>) => {
    setisloading(true);
    try {
        const userData = {name,email,phone}
        const user = await createUser(userData)
        if(user) router.push(`/patient/${user.$id}/register`)
        
    
    } catch (error) {
        console.error(error); // Handle the error appropriately
    } finally {
        setisloading(false); // Ensure loading state is reset
    }
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4 ">
            <h1 className="capitalize text-xl font-black">Hi there 👋 </h1>
            <p className="text-dark-700 ">schedule your first appointment</p>
        </section>
      <CustomFormfeild 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name="name"
      label="Full name"
      placeholder="John Doe"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"
       />
  <CustomFormfeild 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name="email"
      label="email"
      placeholder="moinnakhwaji@gmail.com.."
      iconSrc="/assets/icons/email.svg"
      iconAlt="email"
       />
       <CustomFormfeild 
      fieldType={FormFieldType.PHONE_INPUT}
      control={form.control}
      name="phone"
      label="phone number"
      placeholder="(555) 123-789.."
      // iconSrc="/assets/icons/email.svg"
      // iconAlt="email"
      
       />

     <SubmitButton  isloading={isloading} >Get startted</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm;
