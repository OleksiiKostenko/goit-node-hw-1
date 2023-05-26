const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { constants } = require("buffer");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function writeFile(data) {
  return await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const allContacs = JSON.parse(data);
  return allContacs;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const filterContactById = contacts.find(
    (contact) => contact.id === contactId
  );
  return filterContactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
module.exports = { listContacts, getContactById, removeContact, addContact };
