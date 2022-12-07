const pkg = {
  name: "api_social_media",
  version: "1.0.0",
  description: "",
  license: "ISC",
};

const getInfoApi = (req, res) => {
  res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    license: pkg.license,
  });
};

export default getInfoApi;
