export default function Home() {
  return (
    <>
      <div className="absolute flex flex-col items-center top-40 right-[370px] gap-10">
        <p className="text-4xl font-extrabold">
          🐈 야옹 주식회사의 Todo List를 소개합니다 🐾
        </p>
        <p className="text-xl">
          상단의 tap을 눌러 회사정보와 Todo List를 확인해보세요!
        </p>
      </div>
      <div className="flex justify-between items-end">
        <img src="cat-removebg.png" alt="" className="w-[500px] object-cover" />
        <img src="cat2-removebg.png" alt="" className="w-[600px]" />
      </div>
    </>
  );
}
