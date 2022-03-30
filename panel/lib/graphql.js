import { useState } from 'react'
import useSWR from 'swr'

const getNewAccessToken = async () => {
  const getAccessToken = {
    query: `
      mutation getAccessToken($refreshToken: String!){
        accessToken(refreshToken: $refreshToken)
      }`,
    variables: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  }
  const resAccessToken = await fetch(process.env.NEXT_PUBLIC_API, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(getAccessToken),
  })
  const jsonAccessToken = await resAccessToken.json()
  return jsonAccessToken
}
const fetcher = async query => {
  const accessToken = localStorage.getItem('accessToken')
  const headers = {
    'Content-type': 'application/json',
  }
  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API, {
    headers,
    method: 'POST',
    body: query,
  })
  const resToJSON = await res.json()
  if (
    !(
      resToJSON.errors &&
      resToJSON.errors[0] &&
      resToJSON.errors[0].message === 'Forbidden resource'
    )
  ) {
    return resToJSON
  }
  const jsonAccessToken = await getNewAccessToken()
  if (jsonAccessToken.data) {
    const newAccessToken = jsonAccessToken.data.accessToken
    localStorage.setItem('accessToken', newAccessToken)
    const newRes = await fetch(process.env.NEXT_PUBLIC_API, {
      headers: {
        'Content-type': 'application/json',
        authorization: 'Bearer ' + newAccessToken,
      },
      method: 'POST',
      body: query,
    })
    const newResToJSON = await newRes.json()
    if (
      !(
        newResToJSON.errors &&
        newResToJSON.errors[0] &&
        newResToJSON.errors[0].message === 'Forbidden resource'
      )
    ) {
      return newResToJSON
    }
  }
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  window.location = '/'
  return null
}
const uploader = async formData => {
  const accessToken = localStorage.getItem('accessToken')
  const headers = {}
  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API, {
    headers,
    method: 'POST',
    body: formData,
  })
  const resToJSON = await res.json()
  if (!resToJSON.errors) {
    return resToJSON
  }
  const jsonAccessToken = await getNewAccessToken()
  if (jsonAccessToken.data) {
    const newAccessToken = jsonAccessToken.data.accessToken
    localStorage.setItem('accessToken', newAccessToken)
    const newRes = await fetch(process.env.NEXT_PUBLIC_API, {
      headers: { authorization: 'Bearer ' + newAccessToken },
      method: 'POST',
      body: formData,
    })
    const newResToJSON = await newRes.json()
    if (!newResToJSON.errors) {
      return newResToJSON
    }
  }
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  window.location = '/'
  return null
}
const useQuery = queryStr => {
  const query = {
    query: queryStr,
  }
  const AllData = useSWR(JSON.stringify(query), fetcher)
  const { data, ...rest } = AllData
  return { data: data ? data.data : null, ...rest }
}

const useMutation = query => {
  const [data, setData] = useState(null)
  const mutate = async variables => {
    const mutation = {
      query,
      variables,
    }
    try {
      const returnedData = await fetcher(JSON.stringify(mutation))
      setData(returnedData)
      return returnedData
    } catch (err) {}
  }
  return [data, mutate]
}

const useUpload = query => {
  const [data, setData] = useState(null)
  const mutate = async variables => {
    const mutation = {
      query,
      variables: {
        ...variables,
        file: null,
      },
    }
    const map = {
      0: ['variables.file'],
    }
    const formData = new FormData()
    formData.append('operations', JSON.stringify(mutation))
    formData.append('map', JSON.stringify(map))
    formData.append(0, variables.file)
    try {
      const returnedData = await uploader(formData)
      setData(returnedData)
      return returnedData
    } catch (err) {}
  }
  return [data, mutate]
}

export { useQuery, useMutation, fetcher, useUpload }
