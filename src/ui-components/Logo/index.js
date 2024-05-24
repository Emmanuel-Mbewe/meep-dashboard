import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={`/`}>
        <Image src={"/MeeP.png"} width={"100"} height={"50"} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
