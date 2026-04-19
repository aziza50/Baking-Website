import { SignUpForm } from "@/components/sign-up-form";
import Image from "next/image";
export default function Page() {
  return (
    <div className="flex flex-row items-center justify-center h-screen gap-10">
      <div className="flex flex-col gap-10 mt-70">
        <Image
          src="/images/cake.png"
          alt="Cake"
          width={150}
          height={150}
          style={{ rotate: "20deg" }}
        ></Image>
        <Image
          src="/images/pie.png"
          alt="Pie"
          width={180}
          height={180}
          style={{ rotate: "10deg" }}
        ></Image>
      </div>
      <div className="w-1/3">
        <SignUpForm />
      </div>
      <div className="flex flex-col gap-5 mb-40">
        <Image
          src="/images/ice_cream.png"
          alt="Ice Cream"
          width={90}
          height={90}
          style={{ transform: "rotate(-20deg)" }}
        ></Image>
        <Image
          src="/images/jello.png"
          alt="Jello"
          width={150}
          height={150}
          style={{ transform: "rotate(-10deg)" }}
        ></Image>
      </div>
    </div>
  );
}
