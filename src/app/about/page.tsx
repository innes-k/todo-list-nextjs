import React from "react";

const AboutPage = async () => {
  const response = await fetch(`http://localhost:3000/api/company`);

  const { companyInfo } = await response.json();
  console.log(companyInfo);

  const { name, description, image } = companyInfo;

  return (
    <div>
      <li>{name}</li>
      <li>{description}</li>
      {/* <Image src={image} alt="" width={400} height={400} /> */}
    </div>
  );
};

export default AboutPage;
