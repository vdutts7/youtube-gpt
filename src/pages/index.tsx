import MKBHD from "~/components/MKBHD";
import User from "~/components/User";
import Chat from "~/components/Chat";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="mx-auto mt-10 flex w-full md:ml-16 max-w-7xl flex-col md:flex-row dark-gradient">
      <div className="flex w-full md:ml-8 flex-row md:w-1/3 md:flex-col">
        <MKBHD />
      </div>
      <div className="w-full md:w-6/3">
        <Chat />
      </div>
    </div>
  );
};

export default Home;


