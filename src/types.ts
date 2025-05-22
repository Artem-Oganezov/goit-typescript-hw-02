export interface ImageCardProps {
  handleImage: (image: Image) => void;
  image: Image;
}

export interface Image {
  id: string;
  alt_description: string | undefined;
  urls: {
    small: string;
    regular: string;
  };
}

export interface RespApi {
  total: number;
  total_pages: number;
  results: Image[];
}

export interface ImageGalleryProps {
  data: Image[];
  handleImage: (image: Image) => void;
}

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

export interface LoadMoreBtnProps {
  loadMoreI: () => void;
}

export interface SearchBarProps {
  handleChangeValue: (newQuery: string) => void;
}
