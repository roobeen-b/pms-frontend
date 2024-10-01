import { getCurrentUser } from "@/lib/actions/patient.actions";

const Header = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return <div className="py-5 px-[5%] xl:px-12">Header</div>;
};

export default Header;
