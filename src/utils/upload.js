import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("cloud_name", "dgofftfvk");
  data.append("upload_preset", "muohmkoe");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgofftfvk/upload",
      { body: data, method: "POST" }
      // const res = await axios.post(
      //   "https://api.cloudinary.com/v1_1/dgofftfvk/upload",
      //   { data }
    );
    // console.log(res.data);
    const back = await res.json();
    console.log(back);

    const url = back.secure_url;
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
};
export default upload;
