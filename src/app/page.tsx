// 'use client'

import TableData from "./Components/Table";

const Home = () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[50vw]">
        <TableData />
      </div>

      <div className="hey">aqui iran los filtrados</div>
    </main>
  );
}
export default Home
