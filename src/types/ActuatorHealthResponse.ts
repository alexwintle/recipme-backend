export interface ActuatorHealthResponse {
  statusCode: number,
  components: {
    app: { status: string }
    mongo: { status: string, error?: string }
  }
}