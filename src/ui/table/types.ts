export interface Column {
  id: string;
  Header: string | JSX.Element;
  accessor: string;
  width?: string;
}

export interface Data {
  [key: string]: any;
}
