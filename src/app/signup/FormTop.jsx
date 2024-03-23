import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

function FormTop() {
  return (
    <div className="sm:mx-auto sm:w-full">
      <Image
        className="mx-auto h-[10rem] w-auto"
        src={logo}
        alt="Solo Serve Logo"
      />
      <div className="text-start w-full ml-8">
        <h2 className="mt-5 text-start text-xl font-bold leading-9 tracking-tight text-gray-900">
          Get started for free
        </h2>
        <h4 className="text-start">
          Already registered?{" "}
          <Link href={"/signin"} className="text-primaryGreen">
            Sign In
          </Link>{" "}
          to your account.
        </h4>
      </div>
    </div>
  );
}

export default FormTop;
