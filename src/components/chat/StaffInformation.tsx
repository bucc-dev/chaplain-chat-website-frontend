import { StaffInfo } from "@/types/chat";

const StaffInformation = ({ info }: { info: StaffInfo }) => {
  return (
    <>
      <p className="text-main text-xl lg:text-2xl font-medium">
        {info.firstname} {info.lastname}
      </p>
      <p className="text-gray-500 text-lg">{info.email}</p>
    </>
  );
};

export default StaffInformation;
