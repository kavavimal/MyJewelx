import SimpleBar from "simplebar-react";

const SessionLoader = () => {
  return (
    <aside className="w-1/5">
      <SimpleBar
        style={{ height: "100vh", position: "sticky" }}
        className="top-0 left-0 h-screen border-r border-dashed p-5 space-y-2 dark:bg-gray-50 dark:text-gray-800"
      >
        <div className="flex justify-start mb-7">Loading...</div>
      </SimpleBar>
    </aside>
  );
};

export default SessionLoader;
