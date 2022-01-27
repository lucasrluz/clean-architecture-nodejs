export interface ControllerInterface {
  perform(value: any): Promise<{ statusCode: number; value: any }>;
}
