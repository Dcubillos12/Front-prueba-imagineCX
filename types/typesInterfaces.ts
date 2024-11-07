export interface Contact {
  id?: number;
  name: string;
  city: string;
  email: string;
  phone: string;
}

export interface ContactList {
  items: Contact[];
}
