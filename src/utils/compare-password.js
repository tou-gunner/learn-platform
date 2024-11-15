import bcrypt from 'bcryptjs'

export default async function comparePasswords(plainPassword, hashedPassword) {
  try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      if (match) {
          return true;
      } else {
          return false;
      }
  } catch (err) {
      console.error('Error comparing passwords:', err);
  }
};