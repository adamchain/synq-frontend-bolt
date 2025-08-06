import { models } from "../lib/db.mjs";
import { Op } from 'sequelize'

import {
  createRow,
  deleteRow,
  findRows,
  getRowById,
  updateRow,
} from "../lib/crud.mjs";

const { Appt: Model, ApptType, ApptStatus, Branch, Patient, User } = models;

export async function get(user, id, options = {}) {
  if (!options.include) {
    options.include = [
      {
        model: Branch,
        as: 'branch'
      },
      {
        model: Patient,
        as: 'patient'
      },
      {
        model: User,
        as: 'user'
      },
      {
        model: ApptType,
        as: 'apptType'
      },
      {
        model: ApptStatus,
        as: 'apptStatus'
      }
    ];
  }
  return getRowById(Model, user, id);
}

export async function find(user, query, options = {}) {
  if (!options.include) {
    options.include = [
      {
        model: Branch,
        as: 'branch'
      },
      {
        model: Patient,
        as: 'patient'
      },
      {
        model: User,
        as: 'user'
      },
      {
        model: ApptType,
        as: 'apptType'
      },
      {
        model: ApptStatus,
        as: 'apptStatus'
      }
    ];
  }
  return findRows(Model, user, query, options);
}

export async function create(user, data) {
  return createRow(Model, user, data);
}

export async function update(user, id, data) {
  return updateRow(Model, user, id, data);
}

export async function del(user, id) {
  return deleteRow(Model, user, id);
}

export async function getUpcoming(user) {
  return await find(user, { startTime: { [Op.gt]: new Date() }});
}
