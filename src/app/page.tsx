"use client";

import Task from "@/components/Tasks/Task";
import { withAuth } from "@/components/Auth/withAuth";

function Home() {
  return (
    <div className="w-screen h-screen bg-[#658c50] flex flex-col justify-center items-center gap-8">
      {/* Authenticated User's Tasks */}
      <section className=" max-h-3/4 md:max-w-3xl w-[90%] p-4 bg-[#e2d7ab] rounded-xl flex flex-col gap-4 overflow-y-auto">
        <Task />
      </section>

    </div>
  );
}
// Wrap the Home("/") component with the withAuth HOC
export default withAuth(Home);
