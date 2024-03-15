import React from "react";

const AboutPage = async () => {
  const response = await fetch(`http://localhost:4005/companyInfo`);
  const companyInfo = await response.json();
  const { name, description, image } = companyInfo;

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <p className="text-4xl font-extrabold">{name}</p>
      <p className="text-2xl">{description}</p>
      <img src={image} alt="" width={400} height={400} />
    </div>
  );
};

export default AboutPage;
