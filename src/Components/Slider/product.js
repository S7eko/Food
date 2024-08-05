import React from "react";
import { Link } from "react-router-dom";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarRegular } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  const { product } = props;

  // تقسيم الوصف إلى كلمات وحساب عدد الكلمات
  const words = product.description.split(" ");
  const wordCount = words.length;
  let brCount = 0; // عدد أسطر br الديناميكية

  if (wordCount <= 16) {
    brCount = 3;
  } else if (wordCount > 16 && wordCount <= 28) {
    brCount = 2;
  }

  const needsTruncation = wordCount > 32;
  const truncatedDescription = needsTruncation
    ? words.slice(0, 32).join(" ") + "..."
    : product.description;

  // تقليص العنوان حسب عدد الأحرف
  const maxTitleLength = 20; // الحد الأقصى لطول العنوان بالأحرف
  const truncatedTitle =
    product.title.length > maxTitleLength
      ? product.title.slice(0, maxTitleLength) + "..."
      : product.title;

  // دالة لإنشاء نجوم بناءً على التقييم
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // عدد النجوم الكاملة
    const halfStar = rating % 1 !== 0; // التحقق من وجود نجم نصف
    const totalStars = 5; // إجمالي عدد النجوم

    return [...Array(totalStars)].map((_, index) => {
      if (index < fullStars) {
        // إذا كان المؤشر أقل من عدد النجوم الكاملة، نعرض نجم ممتلئ
        return <FontAwesomeIcon key={index} className="star" icon={faStar} />;
      } else if (index === fullStars && halfStar) {
        // إذا كان المؤشر يساوي عدد النجوم الكاملة وكان هناك نجم نصف، نعرض نجم نصف ممتلئ
        return <FontAwesomeIcon key={index} className="star" icon={faStarHalfAlt} />;
      } else {
        // إذا لم يكن هناك نجم ممتلئ أو نصف ممتلئ، نعرض نجم فارغ
        return <FontAwesomeIcon  key={index} className="star" id="star0" icon={faStarRegular} />;
      }
    });
  };

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{truncatedTitle}</h5>
        <p className="card-text">
          {truncatedDescription}
          {Array.from({ length: brCount }).map((_, index) => (
            <React.Fragment key={index}>
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="card-footer">
          <Link to={`/product/${product.id}`} className="btn btn-primary btn-lg">
            Show More
          </Link>

          <div>
            <p>Price: ${product.price}</p>
            <div className="rating">
              {renderStars(product.rating.rate)} {/* عرض النجوم */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
