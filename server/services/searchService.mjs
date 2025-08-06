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
  }).then(rows => {
    const patients = [];
    let data = rows.map(row => {
      if (row.patients) patients.push(row.patients)
      return {
        id: row.id,
        name: `${row.firstName.trim()} ${row.lastName.trim()}`,
        type: 'C'
      };
    });
    if (patients.length) {
      data = [ ...data, patients.map(row => {
        return {
          id: row.id,
          name: `${row.firstName.trim()} ${row.lastName.trim()}`,
          type: 'P',
          clientId: row.clientId,
          breed: row.breed.breedName,
          image: row.breed.breedImage
        };
      })]
    }
    return data.sort((a, b) => a.name.localeCompare(b.name));
  });
}
