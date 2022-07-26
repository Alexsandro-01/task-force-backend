import bcrypt from 'bcrypt';
import ValidationError from '../errors/ValidationError';

class Validate {
  static async  password(reqPasswaord: string, userPassword: string): Promise<void> {
    const isValid = await bcrypt.compare(reqPasswaord, userPassword);

    if (!isValid) {
      ValidationError.Unauthorized('Invalid email or password, try again.');
    }
  }
}

export default Validate;