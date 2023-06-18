import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";

const MKBHD = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center glassy-no-glow text-white rounded-lg shadow-2xl hover:shadow-4xl">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/mkbhd.png"
      alt="Marques Brownlee AI"
    />
    
    <div className="px-6 pt-4">
      <div className="mb-2 text-2xl font-bold">Marques Brownlee ⚡️</div>

      <div className="text-base text-xs text-gray-400 pt-2">YouTuber  •  AI Bot 🤖</div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0rem' }}>
        <a href="https://www.youtube.com/@mkbhd">
          <img src="/yt.png" alt="YouTube logo" width={24} height={24} />
        </a>
        <a href="https://www.youtube.com/@mkbhd">
          <IconExternalLink
              className="ml-1 text-gray-400 hover:text-red-600"
              size={14}
            />
        </a>

      </div>
    </div>
  </div>
);

export default MKBHD;