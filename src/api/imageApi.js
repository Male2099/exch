const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
  async uplaodImage(file) {
    if (!file) return null;
    //input take file multipart file from formdata
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${API_BASE_URL}/upload/images`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.imageUrl || data.ImageUrl;
    } catch (error) {
      console.error("error appear: " + res.message);
    }
  },
};