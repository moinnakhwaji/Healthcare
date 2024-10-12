
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.action";

import Image from "next/image";


const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  // console.log(API_KEY)
  // console.log(user,"userId", user)
  return (
    <div className="flex h-screen max-h-screen">
      <section className=" remove-scrollbar container">
        <div className=" sub-container  max-w-[860px] flex-1 flex-col py-10">
          <Image
            className="mb-12 h-10 w-full"
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
          />
          <RegisterForm user={user} />
          <p className=" copy-right py-12 text-dark-600 xl:text-left">
              © 2024 Care Heaven
            </p>
         
        </div>
      </section>

      <Image
        className="cover side-img max-w-[390px] "
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        alt="sideimage"
      ></Image>
    </div>
  );
};

export default Register;
