
//Importing components
import Searchbar from "@/components/Searchbar";
import Task from "@/components/Task";

export default async function Home() {
 
  return (
    <div className="w-screen h-screen bg-[#658c50] flex flex-col justify-center items-center gap-8">
      <section>
        <Searchbar />
      </section>

      <section className="w-3/4 max-h-3/4 p-4 bg-[#e2d7ab] rounded-xl flex flex-col gap-4 overflow-y-auto">
        <Task />
      </section>
    </div>
  );
}
