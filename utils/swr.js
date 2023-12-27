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

export const useCourse = (token, id, category, title) => {
  let titleQuery = ''

  if (title) {
    titleQuery = title
  }

  const { data, isLoading, mutate, error } = useSWR(
    token && id
      ? [`${process.env.API_URL}/courses/${id}`, token]
      : [`${process.env.API_URL}/courses/?category=${category}&title=${titleQuery}`, token],
    ([url, token]) => fetcher(url, token)
  )
  return {
    course: data?.data,
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
    chapter: data?.data,
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
    payment: data?.data.payments,
    totalData: data?.data.total,
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
    categories: data?.data,
    isLoading,
    mutate,
    error,
  }
}
