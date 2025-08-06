import { models } from "../lib/db.mjs";

import {
  createRow,
  deleteRow,
  findRows,
  getRowById,
  updateRow,
} from "../lib/crud.mjs";
import { Op } from 'sequelize'

const { Reminder: Model, Client, Patient, User, ReminderType, ReminderStatus } = models;

export async function get(user, id) {
  return getRowById(Model, user, id);
}

export async function find(user, query, options = {}) {
  if (!options.include) {
    options.include = [
      {
        model: Client,
        as: 'client'
      },
      {
        model: Patient,
        as: 'patient'
      },
      {
        model: ReminderType,
        as: 'reminderType'
      },
      // {
      //   model: ReminderStatus,
      //   as: 'reminderStatus'
      // }
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
  return await find(user, { nextDueDate: { [Op.gt]: new Date() }});
}
