require("./contacts");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await getContactById(id);
      return console.log(oneContact);

    case "add":
      const addOneContact = await addContact({ name, email, phone });
      return console.log(addOneContact);

    case "remove":
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);

    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
