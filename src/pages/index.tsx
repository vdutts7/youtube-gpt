/* eslint-disable */
import MKBHD from "~/components/MKBHD";
import Chat from "~/components/Chat";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="mx-auto mt-10 flex w-full md:ml-16 flex-col md:flex-row dark-gradient">
      <div className="flex w-full md:ml-8 flex-row md:w-1/3 md:flex-col">
        <MKBHD />
      </div>
      <div className="flex w-full md:w-2/3">
        <Chat />
      </div>
    </div>
  );
};

export default Home;

