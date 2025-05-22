import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import { Image } from "./types";

function App() {
  const [data, setData] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  const handleImage = (item: Image) => {
    setCurrentImage(item);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://api.unsplash.com/search/photos", {
          headers: {
            Authorization:
              "Client-ID T_94gPQ09YDGXErTAc1pexDKhSwSitav9FE5_q8C7QY",
          },
          params: {
            page: page,
            per_page: 12,
            query: query,
            signal: controller.signal,
          },
        });

        if (page === 1) {
          setData(res.data.results);
        } else {
          setData((prev) => [...prev, ...res.data.results]);
        }
        setTotalPage(res.data.total_pages);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
    return () => {
      controller.abort();
    };
  }, [query, page]);

  const handleChangeValue = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setData([]);
  };

  const loadMoreImg = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: "blue",
            color: "#fff",
          },
        }}
      />
      <div>
        <SearchBar handleChangeValue={handleChangeValue} />
        {isError && <ErrorMessage />}
        <ImageGallery data={data} handleImage={handleImage} />
        {isLoading && <Loader />}

        {page < totalPage && !isLoading && (
          <LoadMoreBtn loadMoreI={loadMoreImg} />
        )}
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          image={currentImage}
        />
      </div>
    </>
  );
}

export default App;
