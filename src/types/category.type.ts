export type category = {
    id: string
    name: string
    status: TStatusLiteral
}
export type TStatusLiteral =
  | '配信NG'
  | '修正中'
  | '監修中'
  | '未承認'
  | '承認'
  | ''

  export interface ICommentResponse {
    message: 'string'
    data: string[]
  }
  