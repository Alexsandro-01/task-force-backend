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

  static internalServerError(): void {
    throw new Error(
      'Peço perdão pelo transtorno, mas o serviço está indisponível. Por favor tente mais tarde.'
    );
  }
}

export default ValidationError;