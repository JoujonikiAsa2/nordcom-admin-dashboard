const addSpecification = () => {
  setProductForm((prev) => ({
    ...prev,
    specification: [...prev.specification, { key: "", value: "" }],
  }));
};

const removeSpecification = (index: number) => {
  setProductForm((prev) => ({
    ...prev,
    specification: prev.specification.filter((_, i) => i !== index),
  }));
};

const updateSpecification = (
  index: number,
  field: "key" | "value",
  value: string
) => {
  setProductForm((prev) => ({
    ...prev,
    specification: prev.specification.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    ),
  }));
};

const addImage = () => {
  setProductForm((prev) => ({
    ...prev,
    imageFiles: [...prev.imageFiles, { file: null, preview: "" }],
  }));
};

const removeImage = (index: number) => {
  setProductForm((prev) => ({
    ...prev,
    imageFiles: prev.imageFiles.filter((_, i) => i !== index),
  }));
};

const addSeoInfo = () => {
  setProductForm((prev) => ({
    ...prev,
    seoInformation: [...prev.seoInformation, { key: "", value: "" }],
  }));
};

const removeSeoInfo = (index: number) => {
  setProductForm((prev) => ({
    ...prev,
    seoInformation: prev.seoInformation.filter((_, i) => i !== index),
  }));
};

const updateSeoInfo = (
  index: number,
  field: "key" | "value",
  value: string
) => {
  setProductForm((prev) => ({
    ...prev,
    seoInformation: prev.seoInformation.map((info, i) =>
      i === index ? { ...info, [field]: value } : info
    ),
  }));
};

const addVariant = () => {
  setProductForm((prev) => ({
    ...prev,
    variants: [...prev.variants, ""],
  }));
};

const removeVariant = (index: number) => {
  setProductForm((prev) => ({
    ...prev,
    variants: prev.variants.filter((_, i) => i !== index),
  }));
};

const updateVariant = (index: number, value: string) => {
  setProductForm((prev) => ({
    ...prev,
    variants: prev.variants.map((variant, i) =>
      i === index ? value : variant
    ),
  }));
};
