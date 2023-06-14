import Image from "next/image";

const MKBHD = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/mkbhd.png"
      alt="Marques Brownlee AI"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">Marques Brownlee ⚡️</div>
      <div className="text-base text-l text-gray-700 font-bold"><i>YouTuber</i></div>
      <p className="text-base text-gray-700 font-bold">
        <i>Artificially Intelligent 🤖</i>
      </p>
    </div>
  </div>
);

export default MKBHD;
