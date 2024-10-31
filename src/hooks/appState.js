import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTnx } from "../apiServices";
import { STORAGE_KEY } from "../constants/constants";

const useAppState = () => {
  const oldValue = sessionStorage.getItem(STORAGE_KEY);
  const oldValueData = oldValue ? JSON.parse(oldValue) : [];
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["transactions"], queryFn: fetchTnx });

  const mutation = useMutation({
    mutationFn: (data) => {
      // using session storage to hold new data
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([
          {
            ...data,
            id: Math.floor(Math.random() * 20).toString(),
          },
          ...oldValueData,
        ])
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions: query?.data?.data?.transactions
      ? [...oldValueData, ...query?.data?.data?.transactions].map((val) => {
          return {
            ...val,
            id: `#TRNX-${val.id}`,
          };
        })
      : [],
    mutation,
    loading: query.isLoading,
    error: query.isError,
  };
};

export default useAppState;
