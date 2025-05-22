import s from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "../../types";

const LoadMoreBtn = ({ loadMoreI }: LoadMoreBtnProps) => {
  return (
    <div className={s.btn_box}>
      <button className={s.button} onClick={() => loadMoreI()}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
