import useSWR from "swr";

//CustomHook POST usage data from Mongodb (Mongodb states using POST method even to perform GET requests)
const useFindUsageData = (url: string) => {
  const fetcher = (e: any) => {
    if (!url) return;
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
