import useSWR from "swr";

//CustomHook POST usage log from Client to Mongodb
const useInsertUsageData = (url: string, usageData: any) => {
  const fetcher = (e: any) => {
    if (!url || !usageData) return;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: usageData,
    })
      .then(async (res) => {
        return await res;
      })
      .catch((error) => console.log(error));
  };

  const { data, error, isLoading, mutate } = useSWR(url ?? "", fetcher);

  return { data, isLoading, error, mutate };
};

export default useInsertUsageData;
