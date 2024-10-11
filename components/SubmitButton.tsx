
import { Button } from './ui/button';
import Image from 'next/image';


 interface Buttonprops{
    isloading?: boolean;
    className?: string;
    children: React.ReactNode;
 }

const SubmitButton = ({isloading,className,children}:Buttonprops) => {
  return (
 <Button type='submit' className={className ?? "shad-primary-btn  w-full"} disabled={isloading}>
{isloading?(
    <div className='flex items-center gap-4'>
        <Image className='animate-spin' src={"/assets/icons/loader.svg"} alt='loader' width={24} height={24}/>
    loading....
    </div>
):(
    children  // Corrected: Removed curly braces here
  )}

   </Button>
  )
}

export default SubmitButton