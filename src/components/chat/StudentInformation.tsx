import { StudentInfo } from "@/types/chat";

const StudentInformation = ({ info }: { info: StudentInfo }) => {
  return (
    <p className="text-main text-xl lg:text-2xl w-full text-center font-medium">
      {info.username}
    </p>
  );
};

export default StudentInformation;
