export interface AuthenticateUseCaseInterface {
  authenticate(
    email: string,
    password: string,
  ): Promise<{
    value: any;
    isError(): boolean;
    isSuccess(): boolean;
  }>;
}
