export interface GenerateNewRefreshTokenUseCaseInterface {
  create(
    refreshTokenId: string,
  ): Promise<{ value: any; isError(): boolean; isSuccess(): boolean }>;
}
