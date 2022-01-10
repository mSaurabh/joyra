import cloudinary from "cloudinary";
import { useEffect, useState } from "react";

export const useCloudinary = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  //   dotenv.config({ path: "src/.env" });

  const cloudinaryv2 = cloudinary.v2;
  cloudinaryv2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  const getImages = async () => {
    if (!isCancelled) {
      const results = await cloudinary.v2.search
        .expression(
          "folder:randomized-avatar-api/*" // add your folder
        )
        .sort_by("public_id", "desc")
        .max_results(30)
        .execute();
      return results;
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  });
  return { getImages };
};
