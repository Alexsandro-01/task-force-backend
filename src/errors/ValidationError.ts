class ValidationError {
  static Unauthorized(message: string): void {
    const error = new Error(message);
    error.name = 'Unauthorized';
    throw error;
  }

  static BadRequest(message: string): void {
    const error = new Error(message);
    error.name = 'BadRequest';
    throw error;
  }

  static InternalServerError(): void {
    throw new Error(
      'Sorry for the inconvenience, but the service is unavailable. Please try again later.'
    );
  }

  static NotFoundError(message: string): void {
    const error = new Error(message);
    error.name = 'NotFound';
    throw error;
  }
}

export default ValidationError;