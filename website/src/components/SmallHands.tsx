import Image from "next/image";

const SmallHands = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/small_hands.png"
      alt="you"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">
        Hey, I&apos;m Mr. Small Hands.
      </div>
      <p className="text-base text-gray-700">
        I created this project because I wanted to. 
      </p>
    </div>
  </div>
);

export default SmallHands;
