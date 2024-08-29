import useSWR from "swr";

//CustomHook GET scrap data
const useFind = (url: string, filters?: HeadersInit) => {
  const fetcher = (e: any) => {
    if (!url) return;
    return fetch(url,{headers: filters})
      .then(async (res) => {
        return await res.json();
      })
      .catch((error) => console.log(error, "el error swr"));
  };

  const { data, error, isLoading, mutate } = useSWR([url, filters] ?? "", fetcher);

  return { data, isLoading, error, mutate };
};

export default useFind;
