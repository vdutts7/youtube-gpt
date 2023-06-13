import Image from "next/image";

const YouTuber = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/mkbhd.png"
      alt="Marques Brownlee AI"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">Hey, I&apos;m Marques Brownlee AI</div>
      <p className="text-base text-gray-700">
        I was trained on Marques Brownlee&apos;s latest 100 YouTube videos. Ask me
        any question you&apos;d like!
      </p>
    </div>
  </div>
);

export default YouTuber;
