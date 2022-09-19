const NewsCard = ({ src, title, description }) => {
  return (
    <div className="col-3 py-10 ml-5">
      <div className="w-100 ">
        <img src={src} alt="news-image" className="object-cover w-100" />
      </div>
      <h1 className="font-size-5 px-2 py-1 mt-10">{title}</h1>
      <p className="text-black font-size-3 my-5 px-2 py-1">{description}</p>
    </div>
  );
};

export default NewsCard;
