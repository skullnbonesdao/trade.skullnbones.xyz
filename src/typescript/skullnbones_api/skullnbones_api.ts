/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SATrade {
    /** @format float */
    asset_change: number
    asset_mint: string
    /** @format int64 */
    block: number
    currency_mint: string
    /** @format float */
    market_fee: number
    order_initializer: string
    order_taker: string
    signature: string
    symbol: string
    /** @format int64 */
    timestamp: number
    /** @format float */
    total_cost: number
}

export interface SymbolsType {
    name: string
    value: string
}

export interface UdfConfig {
    exchanges: any[]
    supported_resolutions: string[]
    supports_group_request: boolean
    supports_marks: boolean
    supports_search: boolean
    supports_time: boolean
    supports_timescale_marks: boolean
    symbols_types: SymbolsType[]
}

export interface UdfHistory {
    c: number[]
    h: number[]
    l: number[]
    o: number[]
    s: string
    t: number[]
    v: number[]
}

export interface UdfSearchSymbol {
    description: string
    exchange: string
    full_name: string
    symbol: string
    ticker: string
    type: string
}

export interface UdfSymbolInfo {
    currency_code: string[]
    data_status: string
    description: string[]
    exchange: string
    full_name: string[]
    has_daily: boolean
    has_intraday: boolean
    has_weekly_and_monthly: boolean
    listed_exchange: string
    /** @format float */
    minmov: number
    /** @format float */
    minmov2: number
    /** @format float */
    minmovement: number
    /** @format float */
    minmovement2: number
    name: string[]
    pricescale: number[]
    session: string
    supported_resolutions: string[]
    symbol: string[]
    ticker: string[]
    timezone: string
    type: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat
    /** request body */
    body?: unknown
    /** base url */
    baseUrl?: string
    /** request cancellation token */
    cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
    customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D
    error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = ''
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
    private abortControllers = new Map<CancelToken, AbortController>()
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig)
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key)
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key])
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key]
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {}
        const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
        return keys
            .map((key) =>
                Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)
            )
            .join('&')
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery)
        return queryString ? `?${queryString}` : ''
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key]
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                        ? JSON.stringify(property)
                        : `${property}`
                )
                return formData
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    }

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        }
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken)
            if (abortController) {
                return abortController.signal
            }
            return void 0
        }

        const abortController = new AbortController()
        this.abortControllers.set(cancelToken, abortController)
        return abortController.signal
    }

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken)

        if (abortController) {
            abortController.abort()
            this.abortControllers.delete(cancelToken)
        }
    }

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const queryString = query && this.toQueryString(query)
        const payloadFormatter = this.contentFormatters[type || ContentType.Json]
        const responseFormat = format || requestParams.format

        return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
            },
            signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
            body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
        }).then(async (response) => {
            const r = response as HttpResponse<T, E>
            r.data = null as unknown as T
            r.error = null as unknown as E

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data
                          } else {
                              r.error = data
                          }
                          return r
                      })
                      .catch((e) => {
                          r.error = e
                          return r
                      })

            if (cancelToken) {
                this.abortControllers.delete(cancelToken)
            }

            if (!response.ok) throw data
            return data
        })
    }
}

/**
 * @title RogueMarketAPI
 * @version 0.2.2
 * @license MIT
 * @contact
 *
 * This API is used by the RogueMarket to display charts and data
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    info = {
        /**
         * @description Info Responses with info object.
         *
         * @tags default
         * @name GetInfo
         * @summary Info
         * @request GET:/info
         */
        getInfo: (params: RequestParams = {}) =>
            this.request<string, any>({
                path: `/info`,
                method: 'GET',
                ...params,
            }),
    }
    stats = {
        /**
         * @description First timestamp Responses with logged trade timestamp.
         *
         * @tags stats
         * @name GetFirstTimestamp
         * @summary First timestamp
         * @request GET:/stats/first_timestamp
         */
        getFirstTimestamp: (params: RequestParams = {}) =>
            this.request<SATrade[], any>({
                path: `/stats/first_timestamp`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Last timestamp Responses with logged trade timestamp.
         *
         * @tags stats
         * @name GetLastTimestamp
         * @summary Last timestamp
         * @request GET:/stats/last_timestamp
         */
        getLastTimestamp: (params: RequestParams = {}) =>
            this.request<SATrade[], any>({
                path: `/stats/last_timestamp`,
                method: 'GET',
                format: 'json',
                ...params,
            }),
    }
    trades = {
        /**
         * @description Get trade for address Responses with an array of trades for buy/sell-wallet-address.
         *
         * @tags trades
         * @name GetAddress
         * @summary Get trade for address
         * @request GET:/trades/address
         */
        getAddress: (
            query: {
                address: string
                /** @format int64 */
                limit?: number
            },
            params: RequestParams = {}
        ) =>
            this.request<SATrade[], any>({
                path: `/trades/address`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get last trade from SYMBOL Responses with a last trade for a given symbol. [max. 100]
         *
         * @tags trades
         * @name GetLast
         * @summary Get last trade from SYMBOL
         * @request GET:/trades/last
         */
        getLast: (
            query: {
                /** @example "FOODATLAS" */
                symbol: string
                /** @format int64 */
                limit?: number
            },
            params: RequestParams = {}
        ) =>
            this.request<SATrade[], any>({
                path: `/trades/last`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get trade for mint Responses with an array of trades for asset/token-mint.
         *
         * @tags trades
         * @name GetMint
         * @summary Get trade for mint
         * @request GET:/trades/mint
         */
        getMint: (
            query: {
                mint: string
                /** @format int64 */
                limit?: number
            },
            params: RequestParams = {}
        ) =>
            this.request<SATrade[], any>({
                path: `/trades/mint`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get trade for signature Responses with a trade for a given signature.
         *
         * @tags trades
         * @name GetSignature
         * @summary Get trade for signature
         * @request GET:/trades/signature
         */
        getSignature: (
            query: {
                signature: string
            },
            params: RequestParams = {}
        ) =>
            this.request<SATrade[], any>({
                path: `/trades/signature`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),
    }
    udf = {
        /**
         * @description UDF Home Responses with server time.
         *
         * @tags udf
         * @name GetHome
         * @summary UDF Home
         * @request GET:/udf/
         */
        getHome: (params: RequestParams = {}) =>
            this.request<string, any>({
                path: `/udf/`,
                method: 'GET',
                ...params,
            }),

        /**
         * @description Get UDF-Config Responses with a UDF config in json.
         *
         * @tags udf
         * @name GetConfig
         * @summary Get UDF-Config
         * @request GET:/udf/config
         */
        getConfig: (params: RequestParams = {}) =>
            this.request<UdfConfig[], any>({
                path: `/udf/config`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * @description Get History request Responses with a History-Result in json (oclh).
         *
         * @tags udf
         * @name GetHistory
         * @summary Get History request
         * @request GET:/udf/history
         */
        getHistory: (
            query: {
                /** @example "FOODATLAS" */
                symbol: string
                /** @format int64 */
                from?: number
                /** @format int64 */
                to?: number
                resolution?: string
                /** @format int64 */
                countback?: number
                currencyCode?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<UdfHistory[], any>({
                path: `/udf/history`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get Search request Responses with a Search-Result in json.
         *
         * @tags udf
         * @name GetSearch
         * @summary Get Search request
         * @request GET:/udf/search
         */
        getSearch: (
            query: {
                /** @example "FOOD" */
                query: string
                shipType?: string
                exchange?: string
                /** @example "2" */
                limit: number
            },
            params: RequestParams = {}
        ) =>
            this.request<UdfSearchSymbol[], any>({
                path: `/udf/search`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get Symbol group request Responses with a SymbolGroup in json.
         *
         * @tags udf
         * @name GetSymbolInfo
         * @summary Get Symbol group request
         * @request GET:/udf/symbol_info
         */
        getSymbolInfo: (
            query?: {
                /** @example "FOOD" */
                group?: string
            },
            params: RequestParams = {}
        ) =>
            this.request<UdfSymbolInfo[], any>({
                path: `/udf/symbol_info`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get Symbol resolve request Responses with a SymbolInfo in json.
         *
         * @tags udf
         * @name GetSymbols
         * @summary Get Symbol resolve request
         * @request GET:/udf/symbols
         */
        getSymbols: (
            query: {
                /** @example "FOOD" */
                symbol: string
            },
            params: RequestParams = {}
        ) =>
            this.request<UdfSymbolInfo[], void>({
                path: `/udf/symbols`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * @description Get ServerTime Responses with server time.
         *
         * @tags udf
         * @name GetTime
         * @summary Get ServerTime
         * @request GET:/udf/time
         */
        getTime: (params: RequestParams = {}) =>
            this.request<string, any>({
                path: `/udf/time`,
                method: 'GET',
                ...params,
            }),
    }
}
