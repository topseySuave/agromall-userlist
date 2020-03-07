import Pagination from 'rc-pagination';
import * as React from 'react';

import 'rc-pagination/assets/index.css';

const itemRender = (current, type, element) => {
  if(type === 'page') {
    return <a href={`?page=${current}`}>{current}</a>;
  }
  return element;
};

const AppPaginate = ({ currentPage, pagination, handlePageChange }) => {
  return <Pagination
    total={pagination.total}
    itemRender={itemRender}
    current={currentPage}
    hideOnSinglePage
    onChange={handlePageChange}
    pageSize={pagination.pageSize}
  />;
};

export default AppPaginate;
