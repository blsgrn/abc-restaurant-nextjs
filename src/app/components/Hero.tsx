import { FaLongArrowAltRight } from "react-icons/fa";
import RightArrow from "../../../public/icons/arrow-right.svg";
import Image from "next/image";
import Gradient from "../../../public/purple-gradient.svg";
import HeroImage from "../../../public/HeroImage-ai.svg";
import Google from "../../../public/icons/google.svg";
import Slack from "../../../public/icons/slack.svg";
import Trust from "../../../public/icons/truck.svg";
import Cnn from "../../../public/icons/twitter-x.svg";
import Cluth from "../../../public/icons/suit-club-fill.svg";

const Hero = () => {
  return (
    <div className="pt-4">
      <div className="px-[20px]">
        <h1 className="text-center text-3xl leading-10 font-medium text-blue-900">
          Order you best Cuisine in Our Restaurant Chain
        </h1>
        <p className="text-center pt-6 from-neutral-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ullam
          placeat odit quam fugit quod doloribus accusamus tenetur, laudantium
          enim quasi vitae ut tempora fugiat sunt dolore natus soluta. Itaque!
        </p>
        <div className="flex w-full pt-8">
          <button className="w-1/2 lg:w-fit py-4 px-8 text-white rounded-md bg-sky-300 hover:bg-slate-300">
            Try for free
          </button>
          <button className="flex items-center justify-center gap-x-2 w-1/2 text-blue-800">
            View Pricing
            <span>
              <Image src={RightArrow} alt="Learn more" />
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex h-full w-full justify-center">
        <Image
          src={Gradient}
          alt="Gradient"
          className="min-h-[500px] w-full object-cover lg:h-auto xl:w-[70%]"
        />
        <div className="absolute flex w-full flex-col items-center top-5">
          <Image src={HeroImage} alt="Hero image" />
          <div className="flex w-full flex-col items-center lg:container lg:flex-row lg:justify-between">
            <p className="text-white text-center font-bold">
              Trusted by these companies
            </p>
            <div className="grid grid-cols-3 items-center justify-evenly justify-items-center align-middle">
              <Image
                src={Google}
                alt="Image description"
                width={100}
                height={100}
              />

              <Image src={Slack} alt="" width={100} height={100} />
              <Image src={Trust} alt="" width={100} height={100} />
              <Image src={Cnn} alt="" width={100} height={100} />
              <Image src={Cluth} alt="" width={100} height={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
