import useSWR from 'swr';

export const fetcher = async (url, token) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const useCourse = (token, id, category, title) => {
  let titleQuery = '';

  if (title) {
    titleQuery = title;
  }

  const { data, isLoading, mutate, error } = useSWR(
    token
      ? id
        ? [`${process.env.API_URL}/courses/${id}`, token]
        : [`${process.env.API_URL}/courses/?category=${category}&title=${titleQuery}`, token]
      : null,
    ([url, token]) => fetcher(url, token),
  );
  return {
    course: data?.data,
    isLoading,
    mutate,
    error,
  };
};

export const useChapter = (token, id) => {
  const { data, isLoading, mutate, error } = useSWR(
    token ? [`${process.env.API_URL}/chapters/${id}`, token] : null,
    ([url, token]) => fetcher(url, token),
  );
  return {
    chapter: data?.data,
    isLoading,
    mutate,
    error,
  };
};

export const usePayment = (token, status) => {
  let statusQuery = '';
  if (status) {
    statusQuery = status;
  }

  const { data, isLoading, mutate, error } = useSWR(
    token ? [`${process.env.API_URL}/payments/all/?status=${statusQuery}`, token] : null,
    ([url, token]) => fetcher(url, token),
  );
  return {
    payment: data?.data,
    isLoading,
    mutate,
    error,
  };
};

export const useCategory = (token) => {
  const { data, isLoading, mutate, error } = useSWR(
    token ? [`${process.env.API_URL}/categories`, token] : null,
    ([url, token]) => fetcher(url, token),
  );
  return {
    categories: data?.data,
    isLoading,
    mutate,
    error,
  };
};
