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
  let categoryQuery = '';
  let titleQuery = '';
  if (category) {
    categoryQuery = category;
  }
  if (title) {
    titleQuery = title;
  }

  const { data, isLoading, mutate } = useSWR(
    token
      ? id
        ? [`${process.env.API_URL}/courses/${id}`, token]
        : [`${process.env.API_URL}/courses/?category=${categoryQuery}&title=${titleQuery}`, token]
      : null,
    ([url, token]) => fetcher(url, token),
  );
  return {
    course: data?.data,
    isLoading,
    mutate,
  };
};
