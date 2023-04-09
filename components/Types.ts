export type autoCompleteOption = {
  id?: number | string;
  label?: string;
};

export type pagesLayoutData = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
