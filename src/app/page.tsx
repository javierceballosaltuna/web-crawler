// 'use client'

import Filters from "./Components/Filters";
import TableData from "./Components/Table";
import Main from "./Main";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[50vw]">
        <Main />
      </div>
    </main>
  );
};
export default Home;
