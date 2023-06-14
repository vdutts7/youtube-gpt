import Image from "next/image";

const User = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/bro.png"
      alt="user"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">You</div>
        {/* <div className="text-base text-l text-gray-700 font-bold"><i>...</i></div> */}
        <p className="text-base text-gray-700 font-bold">
          <i>Human 👤</i>
        </p>
    </div>
  </div>
);

export default User;
