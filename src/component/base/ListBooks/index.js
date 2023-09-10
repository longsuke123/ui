import { useState } from "react";
import CustomPagination from "../CustomPagination";
import Book from "./Book";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import BookModal from "../modal/BookModal";
import { changePage } from "../../../containers/Book/actions";
import BookModalUpdate from "../modal/BookModalUpdate";

const ListBookContainer = styled("div")`
  .block-header {
    color: #6b9876;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      margin: 0;
      font-size: 24px;
      margin-bottom: 5px;
      line-height: 30px;
      text-transform: uppercase;
      font-weight: 500;
    }
  }

  .list-book {
    min-height: 330px;
  }
`;

const ListBooks = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEditDelete, setOpenEditDelete] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const dispatch = useDispatch();

  const { books, pages } = useSelector((state) => state.bookReducer);
  const changePageHandler = (event, value) => {
    dispatch(changePage(value));
  };

  const handlerOpenCreateModal = (value) => {
    setOpenCreate(value);
  };

  const onClickHandler = (item) => {
    setCurrentBook(item);
    setOpenEditDelete(true);
  };

  const handlerOpenEDModal = (value) => {
    setOpenEditDelete(value);
    setCurrentBook(null);
  };

  return (
    <ListBookContainer>
      <div class="block-header">
        <h2 class="title">Mới cập nhật</h2>
        <div>
          <Button variant="text" onClick={() => setOpenCreate(true)}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="list-book">
        {books?.map((item) => (
          <Book data={item} click={onClickHandler} />
        ))}
      </div>

      {pages?.total > 1 && (
        <CustomPagination
          totalPage={pages?.total}
          currentPage={pages.current}
          changePageHandler={changePageHandler}
        />
      )}
      <BookModal isOpen={openCreate} setOpen={handlerOpenCreateModal} />
      {currentBook && (
        <BookModalUpdate
          isOpen={openEditDelete}
          setOpen={handlerOpenEDModal}
          book={currentBook}
        />
      )}
    </ListBookContainer>
  );
};

export default ListBooks;
