// models/userModel.js
const bcrypt = require('bcrypt');
var db = require('../config/db')

class User {
  constructor({ id, email, password, role = 'admin', }) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.id = id;
  }

  // Compare hashed password during login
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
        const userData = rows[0];
        return new User(userData);
      }
      return null; // No user found with the provided email
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user from the database');
    }
  }

}

module.exports = User;
