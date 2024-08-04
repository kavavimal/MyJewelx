import CreatePODForm from "../components/CreatePODForm";
import AdsBanner from "@/components/frontend/AdsBanner";
import Ads from "../../components/Ads";
async function CreatePODPage() {
  const getAds = () =>
    prisma.promotional.findMany({
      where: {
        ads_type: "CART",
      },
    });

  const ads = await getAds();
  return (
    <>
      <div className="bg-primary-250 pt-[70px] pb-[74px] pl-[110px] mt-5 mb-[50px]">
        <div className="container">
          <div className="grid border-2 bg-white  border-black px-5 py-[30px] rounded-md border-t-orange-700 border-l-0 border-r-0 border-b-0 shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] w-[840px] max-w-[100%]">
            <h2 className="text-[20px] font-playfairdisplay pb-[30px]">
              Jewlex On Deman Request
            </h2>
            <CreatePODForm />
          </div>{" "}
        </div>
      </div>
      <div className="container mb-[50px]">
        <Ads ads={ads} />
      </div>{" "}
    </>
  );
}

export default CreatePODPage;
