import useSWR from 'swr'

export const fetcher = async (url, token) => {
  const headers = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(url, {
    headers,
  })
  const data = await res.json()
  return data
}

export const useCourse = (token, id, category, title, limit, page) => {
  let titleQuery = ''
  if (title) {
    titleQuery = title
  }
  const { data, isLoading, mutate, error } = useSWR(
    token && id
      ? [`${process.env.API_URL}/courses/${id}`, token]
      : [`${process.env.API_URL}/courses/?category=${category}&title=${titleQuery}&limit=${limit}&page=${page}`, token],
    ([url, token]) => fetcher(url, token)
  )

  return {
    data: data?.data,
    totalData: data?.totalData,
    isLoading,
    mutate,
    error,
  }
}

export const useChapter = (token, id) => {
  const { data, isLoading, mutate, error } = useSWR(
    token ? [`${process.env.API_URL}/chapters/${id}`, token] : null,
    ([url, token]) => fetcher(url, token)
  )
  return {
    data: data?.data,
    isLoading,
    mutate,
    error,
  }
}

export const usePayment = (token, status, username, limit, page) => {
  let statusQuery = ''
  let usernameQuery = ''
  let limitQuery = ''
  let pageQuery = ''
  if (status) {
    statusQuery = status
  }
  if (username) {
    usernameQuery = username
  }
  if (limit) {
    limitQuery = limit
  }
  if (page) {
    pageQuery = page
  }

  const { data, isLoading, mutate, error } = useSWR(
    token
      ? [
          `${process.env.API_URL}/payments/all/?status=${statusQuery}&username=${usernameQuery}&limit=${limitQuery}&page=${pageQuery}`,
          token,
        ]
      : null,
    ([url, token]) => fetcher(url, token)
  )
  return {
    data: data?.data?.payments,
    totalData: data?.data?.total,
    isLoading,
    mutate,
    error,
  }
}

export const useCategory = (token, statistik) => {
  const { data, isLoading, mutate, error } = useSWR(
    token ? [`${process.env.API_URL}/categories/${statistik ? 'statistik' : ''}`, token] : null,
    ([url, token]) => fetcher(url, token)
  )
  return {
    data: data?.data,
    isLoading,
    mutate,
    error,
  }
}

export const useUser = (token, id, name, limit, page) => {
  let limitQuery = ''
  let pageQuery = ''
  let nameQuery = ''

  if (limit) {
    limitQuery = limit
  }
  if (page) {
    pageQuery = page
  }
  if (name) {
    nameQuery = name
  }

  const { data, isLoading, mutate, error } = useSWR(
    token
      ? id
        ? [`${process.env.API_URL}/users/${id}`, token]
        : [`${process.env.API_URL}/users/?name=${nameQuery}&limit=${limitQuery}&page=${pageQuery}`, token]
      : null,
    ([url, token]) => fetcher(url, token)
  )
  return {
    data: id ? data?.data : data?.data?.user,
    isLoading,
    mutate,
    error,
    totalData: data?.data?.total,
  }
}
