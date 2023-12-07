import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <section className="grid place-items-center h-screen rounded-md font-medium">
      <div className="shadow-inner p-8 bg-gradient-to-r from-green-800 ">
        <AddTask />
        <ListTask />
      </div>
    </section>
  );
}
export default App;
