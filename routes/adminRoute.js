const router = require("express").Router();
const {
  createUser,
  verifyUserOtp,
  requestLoginOtp,
  verifyLoginOtp,
} = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Email and OTP authentication
 */

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Create a user and send verification OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nico Admin
 *               email:
 *                 type: string
 *                 example: admin@nicofarms.com
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *     responses:
 *       201:
 *         description: User created and OTP sent
 *       409:
 *         description: User already exists
 */
router.post("/users", createUser);

/**
 * @swagger
 * /api/admin/users/verify:
 *   post:
 *     summary: Verify newly created user OTP and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@nicofarms.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User verified and JWT returned
 *       400:
 *         description: Invalid or expired OTP
 */
router.post("/users/verify", verifyUserOtp);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Request login OTP for a verified user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@nicofarms.com
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       403:
 *         description: User is not verified
 */
router.post("/login", requestLoginOtp);

/**
 * @swagger
 * /api/admin/login/verify:
 *   post:
 *     summary: Verify login OTP and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@nicofarms.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful and JWT returned
 *       400:
 *         description: Invalid or expired OTP
 */
router.post("/login/verify", verifyLoginOtp);

module.exports = router;
