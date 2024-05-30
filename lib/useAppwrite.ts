import { useEffect, useState } from "react";
import { Alert } from "react-native";

type Creator = {
  username: string;
  avatar: string;
  email: string;
  $id: string;
};

export type MyData = {
  title: string;
  video: string;
  thumbnail: string;
  prompt: string;
  $id: string;
  creator: Creator;
};

const useAppwrite = (fn: () => Promise<MyData[]>) => {
  const [data, setData] = useState<MyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
