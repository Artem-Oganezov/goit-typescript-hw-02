import s from "./ImageCard.module.css";
import { ImageCardProps } from "../../types";

const ImageCard = ({ handleImage, image }: ImageCardProps) => {
  return (
    <div>
      <img
        className={s.img}
        onClick={() => handleImage(image)}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
