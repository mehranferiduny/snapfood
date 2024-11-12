namespace NodeJS{
  interface ProcessEnv{
    //!App
    PORT:number
    URL:string
    //!DB
    DB_PORT:number
    DB_NAME:string
    DB_USERNAME:string
    DB_PASSWORD:string
    DB_HOST:string


    //! S3
    S3_ACCESS_KEY:string
    S3_BUCKET_NAME:string
    S3_SECRET_KEY:string
    S3_API_ENDPOINT:string


    //! ACCSES_TOKEN
    REFRESH_TOKEN_SECRET:string
    ACSSES_TOKEN_SECRET:string

    //!ZarinPall
    ZARINPAL_VERIFAY_URL:string
    ZARINPAL_RREQEST_URL:string
    ZARINPAL_MERCHENT_ID:string
    ZARINPAL_GETWAY_URL:string
  }
}