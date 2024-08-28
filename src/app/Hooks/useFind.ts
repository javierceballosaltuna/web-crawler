import useSWR from "swr";

const useFind = (url: string, filters?: any) => {
  const fetcher = (e: any) => {
    if (!url) return;
    return fetch(url)
      .then(async (res) => {
        return await res.json();
      })
      .catch((error) => console.log(error, "el error swr"));
  };

  const { data, error, isLoading, mutate } = useSWR(url ?? "", fetcher);

  return { data, isLoading, error, mutate };
};

export default useFind;
