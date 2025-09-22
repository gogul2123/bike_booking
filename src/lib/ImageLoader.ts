export const cloudinaryLoader = ({ src, width, quality }) => {
  const parts = src.split("/bikes/");
  return `https://res.cloudinary.com/dpypnnws0/image/upload/w_${width},q_${
    quality || 55
  }/bikes/${parts[1]}`;
};
