class ValidationError {
  static Unauthorized(): void {
    const error = new Error('Invalid email or password, try again.');
    error.name = 'Unauthorized';
    throw error;
  } 
}

export default ValidationError;