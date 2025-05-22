import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { ImageGalleryProps } from "../../types";

const ImageGallery = ({ data, handleImage }: ImageGalleryProps) => {
  return (
    <ul className={s.gallery}>
      {data.map((item) => (
        <li className={s.li} key={item.id}>
          <ImageCard handleImage={handleImage} image={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
