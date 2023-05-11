import styled from "styled-components";

import { Table } from "../../shared";

export const CustomerList = ({ column, customers }) => {
  return <Table column={column} rows={customers} />;
};

const ProductListContainer = styled.div``;
