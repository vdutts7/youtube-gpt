import Image from "next/image";

const MKBHD = () => (
<div className="m-4 max-w-sm overflow-hidden rounded text-center glassy-no-glow text-white rounded-lg shadow-2xl hover:shadow-4xl">    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/mkbhd.png"
      alt="Marques Brownlee AI"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-2xl font-bold">Marques Brownlee ⚡️</div>
      <div className="text-base text-s text-gray-400">YouTuber</div>
      <p className="text-base text-s text-gray-400 ">
        AI 🤖
      </p>
    </div>
  </div>
);

export default MKBHD;
