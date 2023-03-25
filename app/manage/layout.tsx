import ApplicationBar from "@/components/AppBar/AppBar";

function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApplicationBar />
      <div className="h-screen flex flex-col gap-2">{children}</div>;
    </>
  );
}
export default ManageLayout;
