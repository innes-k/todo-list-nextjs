import React from "react";

const AboutPage = async () => {
  const response = await fetch(`http://localhost:4005/companyInfo`);

  const todos = await response.json();
  console.log(todos);

  const { name, description, image } = todos;

  return (
    <div>
      <li>{name}</li>
      <li>{description}</li>
      <img src={image} alt="" width={400} height={400} />
    </div>
  );
};

export default AboutPage;
