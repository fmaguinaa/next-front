import styled from "styled-components";

import { Table } from "../../shared";

export const ProductList = ({ column, products }) => {
  return <Table column={column} rows={products} />;
};

const ProductListContainer = styled.div``;
