import path from "path";

export const verifyImage = (req, res, next) => {
  let extension = [".jpg", ".jpeg", ".png", ".webp"];
  if (!req.files)
    return res.status(404).json({ message: "necesita enviar una imagen" });

  const { image } = req.files;

  let ext = path.extname(image.name);
  if (!extension.includes(ext))
    return res
      .status(404)
      .json({ message: `el archivo ${image.name} no esta permitido` });

  next();
};
