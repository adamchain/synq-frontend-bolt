import { models, Op } from '../lib/db.mjs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { authRequired, validationError, accessDenied } from 'express-rest-error'
import moment from 'moment'
import config from '../../config/index.mjs'

const SALT_ROUNDS = 10

const { Branch, User, UserPwd } = models;

export async function authenticate({ email, password, branchId }) {
  if (!email) {
    throw validationError("Missing email.");
  }
  if (!password) {
    throw validationError("Missing password.");
  }
  if (!branchId) {
    throw validationError("Missing branch identifier.");
  }

  const user = await User.findOne({
    where: {
      status: 'active',
      email: {
        [Op.like]: email.trim(),
      },
    },
  });

  if (!user) {
    throw validationError("Email not found.");
  }

  const branch = await Branch.findByPk(branchId);

  if (!branch) {
    throw validationError("Branch not found.");
  }

  if (branch.orgId !== user.orgId) {
    throw validationError('User does not have access to this organization');
  }

  const latestPwd = await UserPwd.findOne({
    rejectOnEmpty: undefined,
    where: { userId: user.id },
    order: [['created_at', 'DESC']]
  })

  if (!latestPwd) {
    throw validationError('Password not set for user');
  }

  const isMatch = await bcrypt.compare(password, latestPwd.password)
  if (!isMatch) {
    throw validationError("Wrong password.");
  }

  return generateToken(user, branchId);
}

export const register = async ({ email, password, branchId }) => {
  const existing = await User.findOne({ rejectOnEmpty: undefined, where: { email } });
  if (existing) {
    throw validationError('Email already in use');
  }

  const branch = await Branch.findByPk(branchId);

  if (!branch) {
    throw validationError("Branch not found.");
  }

  const user = await User.create({ email, branchId, orgId: branch.orgId });

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await UserPwd.create({ user_id: user.id, password: hashedPassword });

  return user
}

export async function sendPasswordReset(user, id) {
  // todo: implement send password reset
}

export async function resetPassword(email) {
  // todo: implement reset password
}

function verifyToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw authRequired("Access token is not valid.");
  }

  console.log(decoded)
  if (!decoded.u || decoded.b === undefined) {
    throw authRequired("Access token is not valid.");
  }

  return decoded;
}

export async function getUserByToken(token) {
  const decodedToken = verifyToken(token);
  const userId = decodedToken.u;
  return await User.findByPk(userId, { raw: true });
}

export async function getBranchIdByToken(token) {
  const decodedToken = verifyToken(token);
  return decodedToken.b;
}

export async function generateToken(user, branchId) {
  const expiresInDays = 365;
  const expirationTimestamp = moment().add(expiresInDays, "days").format("X");
  const payload = {
    u: user.id,
    b: branchId,
    o: user.orgId,
    exp: parseInt(expirationTimestamp, 10),
  };
  return {
    authToken: jwt.sign(payload, config.jwt.secret),
    expires: new Date(expirationTimestamp * 1000),
    user,
  };
}