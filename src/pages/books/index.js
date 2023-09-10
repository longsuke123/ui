import { styled } from "styled-components";
import CenterMode from "../../component/base/CustomImageSlider";
import ListBooks from "../../component/base/ListBooks";
import Grid from "@mui/material/Grid";
import { listBook } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBook } from "../../containers/Book/actions";

const BooksContainer = styled("div")`
  margin-top: 20px;
  overflow: hidden;
  .bg-white {
    background: white;
    padding: 20px 20px;
  }
`;
const Books = () => {
  const dispatch = useDispatch();
  const { pages } = useSelector((state) => state.bookReducer);

  useEffect(() => {
    dispatch(getBook(pages?.current));
  }, [pages?.current]);

  return (
    <BooksContainer>
      <Grid container spacing={2} className="bg-white">
        <Grid xs={12} sm={12} md={5}>
          <CenterMode listBook={listBook} />
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <ListBooks />
        </Grid>
      </Grid>
    </BooksContainer>
  );
};

export default Books;
