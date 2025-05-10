import Cookie from "js-cookie";

export const EnumTokens = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
  } as const
  
export type EnumTokens = typeof EnumTokens[keyof typeof EnumTokens]

export const getAccessToken = ()=>{
    const accessToken = Cookie.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}

export const saveTokenStorage = (accessToken:string)=>{
    Cookie.set(EnumTokens.ACCESS_TOKEN, accessToken,{
        sameSite: 'strict',
        expires: 1
    })
}

export const removeFromStorage = () => {
    Cookie.remove(EnumTokens.ACCESS_TOKEN)
}