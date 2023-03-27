import ApplicationBar from "@/components/AppBar/AppBar";

function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApplicationBar />
      <div className="h-[calc(100vh_-_94px)] flex flex-col gap-2">
        {children}
      </div>
    </>
  );
}
export default ManageLayout;
