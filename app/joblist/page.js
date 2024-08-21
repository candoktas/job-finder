import Logo from "@/app/_components/Logo";
import UserAvatar from "@/app/_components/UserAvatar";
import SideBar from "@/app/_components/SideBar";
import JobList from "@/app/_components/JobList";
import Logout from "@/app/_components/Logout";
import JobListButton from "@/app/_components/JobListButton";

function Page(props) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full">
        <nav className="sticky flex justify-center md:justify-between items-center py-4 px-6 flex-wrap w-full">
          <Logo />
          <div className="flex items-center">
            <JobListButton />
            <Logout />
            <UserAvatar />
          </div>
        </nav>
        <div className="border-gray-200 border-t min-h-screen">
          <div className="w-full">
            <JobList />
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

export default Page;
