import { models } from "../lib/db.mjs";
import Promise from "bluebird";

const { Client, Patient, PatientBreed, Organization } = models;

export async function search(user) {
  const org = await Organization.findByPk(user.orgId);
  const include = [];
  if (org.product === 'WHSKR') {
    include.push({
      model: Patient,
      as: 'patients',
      attributes: ["id", "firstName", "lastName", "patientSexCd"],
      include: [
        {
          model: PatientBreed,
          as: 'breed',
          attributes: ["breed_name"]
        }
      ]
    });
  }

  return await Client.findAll({
    where: {
      orgId: user.orgId
    },
    include,
    attributes: ["id", "firstName", "lastName"],
  }).then(data => {
    const patients = []
    return Promise.map(data, row => {
      if (row.patients) patients.push(row.patients)
      return {
        id: row.id,
        name: `${row.firstName} ${row.lastName}`,
        type: 'C'
      };
    })
  });
}
