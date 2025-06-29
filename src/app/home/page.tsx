import Banner from '../../components/Banner/Banner';
import Navbarin from '../../components/Navbar/index'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import Calendar from "@/components/Calender";
export const metadata: Metadata = {
  title: "datavoult.com",
  description:
    "DataVoult.com",
};

const Home = () => {
  return (
    <main>
    <Navbarin />  
    <Banner />
    </main>
  );
};

export default Home;