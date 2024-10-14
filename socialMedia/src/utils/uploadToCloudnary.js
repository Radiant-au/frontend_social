const cloud_name = "dh6jges3r";
const upload_preset = "social";

export const uploadToCloudinary = async (file, fileType) => {
  if (file && fileType) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      console.error("Failed to upload media");
      return null;
    }

    const fileData = await res.json();
    console.log(fileData);
    return fileData.url; // Return the secure URL from Cloudinary
  } else {
    console.log("Invalid media file or fileType");
  }
};
