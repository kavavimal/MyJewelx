import CreatePODForm from "../components/CreatePODForm";
import AdsBanner from "@/components/frontend/AdsBanner";
import Ads from "../../components/Ads";

export const revalidate = 0;

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
      <div className="bg-primary-250 pt-[70px] pb-[69px] mt-5 ">
        <div className="container">
          <div className="flex gap-[50px] items-start justify-between">
            <div className="grid border-2 bg-white  border-black px-5 py-[30px] rounded-md border-t-orange-700 border-l-0 border-r-0 border-b-0 shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] w-[910px] max-w-[100%]">
              <h2 className="text-[20px] font-playfairdisplay pb-[30px]">
                Jewlex On Deman Request
              </h2>
              <CreatePODForm />
            </div>
            <div className="w-[320px] max-w-[100%] flex flex-row xl:flex-col items-center gap-[30px] sticky top-[120px]">
              {ads.map((adslist, index) => {
                return (
                  <AdsBanner
                    image={"/assets/images/static banner3.png"}
                    // image={adslist.ads_img_url}
                    title={adslist.ads_desc}
                    link={{ link: adslist.ads_link, label: "Shop Now" }}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="py-[50px]">
          <Ads ads={ads} />
        </div>
      </div>
    </>
  );
}

export default CreatePODPage;
