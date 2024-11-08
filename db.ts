import Dexie, { type EntityTable } from "dexie";

interface Contact {
  id?: number;
  name: string;
  emails: string;
  phones: string;
  city: string;
}

const db = new Dexie("contacts") as Dexie & {
  contacts: EntityTable<
    Contact,
    "id" // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  contacts: "++id, name, emails, phones, city",
});

export type { Contact };
export { db };
