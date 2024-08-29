import useSWR from "swr";

const useFindUsageData = (url: string, filters?: any) => {

  const fetcher = (e: any) => {
    if(!url) return
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      
    })
      .then(async (res) => {
        return await res?.json();
      })
      .catch((error) => console.log(error));
  };

  const { data, error, isLoading, mutate } = useSWR(url ?? "", fetcher);

  return { data, isLoading, error, mutate };

};

export default useFindUsageData;
