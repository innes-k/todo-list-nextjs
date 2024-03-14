export interface Todos {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

export interface TodosQuery {
  data: Todos[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
