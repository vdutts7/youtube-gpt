/* eslint-disable */
import MKBHD from "~/components/MKBHD";
import Chat from "~/components/Chat";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col md:flex-row dark-gradient">
      <div className="flex w-full md:ml-8 flex-row md:w-1/3 md:flex-col">
        <MKBHD />
      </div>
      <div className="w-full md:w- md:mr-8">
        <Chat />
      </div>
    </div>
  );
};

export default Home;